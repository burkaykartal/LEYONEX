import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

// next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // /tr URL'de görünmez, diğerleri görünür (/en, /de, vb.)
});

const isPublicRoute = createRouteMatcher([
  "/",
  "/:locale",
  "/:locale/hakkimizda(.*)",
  "/:locale/hizmetler(.*)",
  "/:locale/projeler(.*)",
  "/:locale/fuarlar(.*)",
  "/:locale/iletisim(.*)",
  "/:locale/teklif-al(.*)",
  "/:locale/giris(.*)",
  "/:locale/kayit(.*)",
  "/api/contact(.*)",
  // Locale olmayan rotalar (geriye dönük uyumluluk)
  "/hakkimizda(.*)",
  "/hizmetler(.*)",
  "/projeler(.*)",
  "/fuarlar(.*)",
  "/iletisim(.*)",
  "/teklif-al(.*)",
  "/giris(.*)",
  "/kayit(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/uye/admin(.*)",
  "/:locale/uye/admin(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Önce intl middleware'i çalıştır
  const intlResponse = intlMiddleware(req);

  // Public routes'a herkes erişebilir
  if (isPublicRoute(req)) {
    return intlResponse;
  }

  // Admin routes için superadmin kontrolü
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      const url = new URL("/giris", req.url);
      return NextResponse.redirect(url);
    }

    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const userRole = publicMetadata?.role;
    if (userRole !== "superadmin") {
      const url = new URL("/uye/dashboard", req.url);
      return NextResponse.redirect(url);
    }
  }

  return intlResponse || NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
