import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { trTR, enUS, deDE, esES, frFR, itIT } from "@clerk/localizations";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	variable: "--font-montserrat",
	display: "swap",
});

// Clerk localization mapping
const clerkLocalizations: Record<string, any> = {
	tr: trTR,
	en: enUS,
	de: deDE,
	es: esES,
	fr: frFR,
	it: itIT,
	// Diğer diller için fallback olarak enUS kullan
	ar: enUS,
	ru: enUS,
	zh: enUS,
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	// Validate locale
	if (!locales.includes(locale as any)) {
		notFound();
	}

	// Get messages for the locale
	const messages = await getMessages();

	// Get Clerk localization
	const clerkLocale = clerkLocalizations[locale] || enUS;

	return (
		<ClerkProvider localization={clerkLocale}>
			<html lang={locale} className={montserrat.variable}>
				<body className="bg-dark text-white antialiased">
					<NextIntlClientProvider messages={messages}>
						{children}
						<Toaster />
					</NextIntlClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
