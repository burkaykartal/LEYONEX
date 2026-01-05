import { Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR } from "@clerk/localizations";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Leyonex - Fuar Dünyasında Fark Yaratan Çözümler",
	description: "Stand tasarımından organizasyona tüm hizmetleri tek noktadan yönetin",
	keywords: "fuar organizasyonu, stand tasarımı, fuar hizmetleri, stand kurulumu",
	authors: [{ name: "Leyonex" }],
	openGraph: {
		title: "Leyonex",
		description: "Fuar dünyasında fark yaratan çözümler",
		type: "website",
		locale: "tr_TR",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider localization={trTR}>
			<html lang="tr" className={montserrat.variable}>
				<body className="bg-dark text-white antialiased">
					{children}
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
