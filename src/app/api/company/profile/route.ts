import { NextRequest, NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { UserRole, CompanyStatus } from "@prisma/client";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Validation schema
const companyProfileSchema = z.object({
	name: z.string().min(2),
	country: z.string().min(2),
	city: z.string().min(2),
	contactPerson: z.string().min(2),
	contactEmail: z.string().email(),
	contactPhone: z.string().optional(),
	sector: z.string().min(2),
	annualFairCount: z.number().min(0).max(100),
	productivityScore: z.number().min(1).max(10),
});

/**
 * GET /api/company/profile
 * Get current user's company profile
 */
export async function GET(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user with company
		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
			include: { company: true },
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		if (!user.company) {
			return NextResponse.json(
				{ error: "Company not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ company: user.company });
	} catch (error) {
		console.error("Get company profile error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

/**
 * POST /api/company/profile
 * Create company profile and upgrade user to CLIENT role
 */
export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Parse and validate request body
		const body = await req.json();
		const validatedData = companyProfileSchema.parse(body);

		// Get or create user in database
		let user = await prisma.user.findUnique({
			where: { clerkId: userId },
			include: { company: true },
		});

		// If user doesn't exist, sync from Clerk
		if (!user) {
			const client = await clerkClient();
			const clerkUser = await client.users.getUser(userId);
			const email = clerkUser.emailAddresses[0]?.emailAddress;

			if (!email) {
				return NextResponse.json(
					{ error: "User email not found" },
					{ status: 400 }
				);
			}

			user = await prisma.user.create({
				data: {
					clerkId: userId,
					email,
					firstName: clerkUser.firstName,
					lastName: clerkUser.lastName,
					role: UserRole.GUEST,
					hasCompletedProfile: false,
				},
				include: { company: true },
			});
		}

		// Check if user already has a company
		if (user.company) {
			return NextResponse.json(
				{ error: "Company profile already exists" },
				{ status: 400 }
			);
		}

		// Create company
		const company = await prisma.company.create({
			data: {
				name: validatedData.name,
				country: validatedData.country,
				city: validatedData.city,
				contactPerson: validatedData.contactPerson,
				contactEmail: validatedData.contactEmail,
				contactPhone: validatedData.contactPhone || null,
				sector: validatedData.sector,
				annualFairCount: validatedData.annualFairCount,
				productivityScore: validatedData.productivityScore,
				status: CompanyStatus.ACTIVE,
			},
		});

		// Update user: link company, set hasCompletedProfile, upgrade to CLIENT
		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: {
				companyId: company.id,
				hasCompletedProfile: true,
				role: UserRole.CLIENT,
			},
			include: { company: true },
		});

		// Update Clerk metadata
		try {
			const client = await clerkClient();
			await client.users.updateUserMetadata(userId, {
				publicMetadata: {
					role: UserRole.CLIENT,
					hasCompletedProfile: true,
					companyId: company.id,
				},
			});
		} catch (clerkError) {
			console.error("Clerk metadata update error:", clerkError);
			// Don't fail the request if Clerk update fails
		}

		return NextResponse.json({
			success: true,
			company,
			user: {
				id: updatedUser.id,
				role: updatedUser.role,
				hasCompletedProfile: updatedUser.hasCompletedProfile,
			},
		});
	} catch (error) {
		console.error("Create company profile error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Invalid input data", details: error.issues },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

/**
 * PUT /api/company/profile
 * Update existing company profile
 */
export async function PUT(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user with company
		const user = await prisma.user.findUnique({
			where: { clerkId: userId },
			include: { company: true },
		});

		if (!user || !user.company) {
			return NextResponse.json(
				{ error: "Company not found" },
				{ status: 404 }
			);
		}

		// Parse and validate request body
		const body = await req.json();
		const validatedData = companyProfileSchema.parse(body);

		// Update company
		const updatedCompany = await prisma.company.update({
			where: { id: user.company.id },
			data: {
				name: validatedData.name,
				country: validatedData.country,
				city: validatedData.city,
				contactPerson: validatedData.contactPerson,
				contactEmail: validatedData.contactEmail,
				contactPhone: validatedData.contactPhone || null,
				sector: validatedData.sector,
				annualFairCount: validatedData.annualFairCount,
				productivityScore: validatedData.productivityScore,
			},
		});

		return NextResponse.json({
			success: true,
			company: updatedCompany,
		});
	} catch (error) {
		console.error("Update company profile error:", error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: "Invalid input data", details: error.issues },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
