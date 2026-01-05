import { NextResponse } from "next/server";
import { resend } from "@/lib/resend/client";
import ContactFormEmail from "@/emails/ContactForm";

export async function POST(req: Request) {
	try {
		const { name, email, phone, message } = await req.json();

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Eksik alanlar var" },
				{ status: 400 }
			);
		}

		// Email gönderimi (Resend entegrasyonu)
		if (process.env.RESEND_API_KEY) {
			try {
				const { data, error } = await resend.emails.send({
					from: "Luna 360 Expo <noreply@luna360expo.com>",
					to: ["info@luna360expo.com"], // TODO: Gerçek email adresi
					replyTo: email,
					subject: `Yeni İletişim Formu: ${name}`,
					react: ContactFormEmail({ name, email, phone, message }),
				});

				if (error) {
					console.error("Resend error:", error);
					// Email hatası olsa bile başarılı dön (log kaydı için)
				}
			} catch (emailError) {
				console.error("Email send error:", emailError);
				// Email hatası olsa bile başarılı dön
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Contact API error:", error);
		return NextResponse.json(
			{ error: "Sunucu hatası" },
			{ status: 500 }
		);
	}
}

