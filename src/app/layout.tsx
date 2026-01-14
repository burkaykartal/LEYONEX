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
        <body className={poppins.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
