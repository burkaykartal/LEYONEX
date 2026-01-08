import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserWithCompany } from "@/lib/auth/utils";
import prisma from "@/lib/prisma";
import { z } from "zod";

const contactMessageSchema = z.object({
	subject: z.string().min(3, "Konu en az 3 karakter olmalıdır"),
	message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
	preferredContact: z.enum(["phone", "whatsapp", "email"]),
});

/**
 * POST /api/contact-message
 * Create a new contact message
 */
export async function POST(req: NextRequest) {
	try {
		// Get authenticated user
		const user = await getCurrentUserWithCompany();

		if (!user || !user.companyId) {
			return NextResponse.json(
				{ error: "Unauthorized or profile not completed" },
				{ status: 401 }
			);
		}

		// Parse and validate request body
		const body = await req.json();
		const validatedData = contactMessageSchema.parse(body);

		// Create contact message
		const contactMessage = await prisma.contactMessage.create({
			data: {
				userId: user.id,
				companyId: user.companyId,
				subject: validatedData.subject,
				message: validatedData.message,
				preferredContact: validatedData.preferredContact,
				status: "NEW",
			},
		});

		return NextResponse.json({
			success: true,
			message: contactMessage,
		});
	} catch (error) {
		console.error("Create contact message error:", error);

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
 * GET /api/contact-message
 * Get user's contact messages
 */
export async function GET(req: NextRequest) {
	try {
		const user = await getCurrentUserWithCompany();

		if (!user) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Get user's messages
		const messages = await prisma.contactMessage.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json({ messages });
	} catch (error) {
		console.error("Get contact messages error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
