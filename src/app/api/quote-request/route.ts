import { NextResponse } from "next/server";
import { resend } from "@/lib/resend/client";
import QuoteRequestEmail from "@/emails/QuoteRequest";

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const {
			name,
			email,
			phone,
			company,
			fairName,
			fairDate,
			fairLocation,
			standSize,
			selectedServices,
			budget,
			additionalNotes,
		} = data;

		// Validation
		if (!name || !email || !phone || !company || !fairName) {
			return NextResponse.json(
				{ error: "Zorunlu alanlar eksik" },
				{ status: 400 }
			);
		}

		// Email gönderimi (Resend entegrasyonu)
		if (process.env.RESEND_API_KEY) {
			try {
				const { error } = await resend.emails.send({
					from: "Leyonex <noreply@leyonex.com>",
					to: ["info@leyonex.com"],
					replyTo: email,
					subject: `Yeni Teklif Talebi: ${company} - ${fairName}`,
					react: QuoteRequestEmail({
						companyName: company,
						contactPerson: name,
						email,
						phone,
						fairName,
						country: fairLocation,
						date: fairDate,
						services: {
							selected: selectedServices,
							standSize,
							budget,
							notes: additionalNotes,
						},
					}),
				});

				if (error) {
					console.error("Resend error:", error);
				}
			} catch (emailError) {
				console.error("Email send error:", emailError);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Quote request API error:", error);
		return NextResponse.json(
			{ error: "Sunucu hatası" },
			{ status: 500 }
		);
	}
}
