import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { trTR } from '@clerk/localizations';
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leyonex - Fuar Organizasyon",
  description: "Profesyonel fuar organizasyon hizmetleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={trTR}>
      <html lang="tr">
        <head>
          {/* Google Translate */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                function googleTranslateElementInit() {
                  new google.translate.TranslateElement({
                    pageLanguage: 'tr',
                    includedLanguages: 'en,ru,ar,zh-CN',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                  }, 'google_translate_element');
                }
              `,
            }}
          />
          <script
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            async
          />
        </head>
        <body className={poppins.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
