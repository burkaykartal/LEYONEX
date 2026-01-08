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

const isProfileCompleteRoute = createRouteMatcher([
  "/uye/profile/complete(.*)",
  "/:locale/uye/profile/complete(.*)",
]);

const isDashboardRoute = createRouteMatcher([
  "/uye/dashboard(.*)",
  "/:locale/uye/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Önce intl middleware'i çalıştır
  const intlResponse = intlMiddleware(req);

  // Public routes'a herkes erişebilir
  if (isPublicRoute(req)) {
    return intlResponse;
  }

  // Get auth info
  const { userId, sessionClaims } = await auth();

  // Require authentication for protected routes
  if (!userId) {
    const url = new URL("/giris", req.url);
    return NextResponse.redirect(url);
  }

  // Profile completion check for dashboard routes
  if (isDashboardRoute(req) && !isProfileCompleteRoute(req)) {
    const publicMetadata = sessionClaims?.publicMetadata as {
      role?: string;
      hasCompletedProfile?: boolean;
    } | undefined;

    const hasCompletedProfile = publicMetadata?.hasCompletedProfile === true;

    // Redirect to profile complete if not completed
    if (!hasCompletedProfile) {
      // Extract locale from URL
      const pathname = req.nextUrl.pathname;
      const localeMatch = pathname.match(/^\/(en|de|es|fr|it|ru|ar|zh)\//);
      const locale = localeMatch ? localeMatch[1] : '';

      const profileUrl = locale
        ? `/${locale}/uye/profile/complete`
        : '/uye/profile/complete';

      const url = new URL(profileUrl, req.url);
      return NextResponse.redirect(url);
    }
  }

  // Admin routes için superadmin kontrolü
  if (isAdminRoute(req)) {
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
