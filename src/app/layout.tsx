import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import { trTR } from '@clerk/localizations';
import GoogleTranslate from '@/components/GoogleTranslate';
import "./globals.css";
// Next.js Script bileşenini içe aktarıyoruz
import Script from "next/script"; 

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
        <body className={poppins.className}>
          <GoogleTranslate />
          {children}

          {/* Google Analytics Kodları Başlangıcı */}
          <Script 
            src="https://www.googletagmanager.com/gtag/js?id=G-BS3L40XBTH" 
            strategy="afterInteractive" 
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-BS3L40XBTH');
            `}
          </Script>
          {/* Google Analytics Kodları Bitişi */}
          
        </body>
      </html>
    </ClerkProvider>
  );
}
