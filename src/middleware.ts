import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Locale middleware with locale detection enabled
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true, // Enable automatic locale detection
});

// Public routes - accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/:locale',
  '/:locale/hakkimizda',
  '/:locale/hizmetler',
  '/:locale/hizmetler/:slug',
  '/:locale/projeler',
  '/:locale/projeler/:slug',
  '/:locale/fuarlar',
  '/:locale/fuarlar/:slug',
  '/:locale/iletisim',
  '/:locale/teklif-al',
  '/:locale/giris(.*)',
  '/:locale/kayit(.*)',
  '/api/contact',
  // Backward compatibility
  '/hakkimizda',
  '/hizmetler',
  '/projeler',
  '/fuarlar',
  '/iletisim',
  '/teklif-al',
]);

// Admin routes
const isAdminRoute = createRouteMatcher([
  '/:locale/uye/admin/:path*',
]);

// Dashboard routes (requires authentication and profile completion)
const isDashboardRoute = createRouteMatcher([
  '/:locale/uye/dashboard/:path*',
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId, sessionClaims } = await auth();

  // Handle root path - redirect to default locale
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/tr', request.url));
  }

  // Extract locale from URL
  const locale = request.nextUrl.pathname.split('/')[1];
  const validLocales = ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'];
  const currentLocale = validLocales.includes(locale) ? locale : 'tr';

  // Handle admin routes
  if (isAdminRoute(request)) {
    if (!userId) {
      const signInUrl = new URL(`/${currentLocale}/giris`, request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }

    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const role = publicMetadata?.role;
    if (role !== 'superadmin') {
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
  }

  // Handle dashboard routes
  if (isDashboardRoute(request)) {
    if (!userId) {
      const signInUrl = new URL(`/${currentLocale}/giris`, request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }

    const publicMetadata = sessionClaims?.publicMetadata as { hasCompletedProfile?: boolean } | undefined;
    const hasCompletedProfile = publicMetadata?.hasCompletedProfile;
    const isProfileCompletePage = request.nextUrl.pathname.includes('/uye/profile/complete');

    if (!hasCompletedProfile && !isProfileCompletePage) {
      return NextResponse.redirect(
        new URL(`/${currentLocale}/uye/profile/complete`, request.url)
      );
    }
  }

  // Apply i18n routing
  return intlMiddleware(request);
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
