import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Create intl middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});

// Protected route matchers
const isAdminRoute = createRouteMatcher(['/:locale/uye/admin/:path*']);
const isDashboardRoute = createRouteMatcher(['/:locale/uye/dashboard/:path*']);
const isPublicRoute = createRouteMatcher([
  '/',
  '/:locale',
  '/:locale/hakkimizda',
  '/:locale/hizmetler(.*)',
  '/:locale/projeler(.*)',
  '/:locale/fuarlar(.*)',
  '/:locale/iletisim',
  '/:locale/teklif-al',
  '/:locale/giris(.*)',
  '/:locale/kayit(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Skip everything for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  // For public routes, just apply intl routing
  if (isPublicRoute(req)) {
    return intlMiddleware(req);
  }

  // For protected routes, check auth first
  const { userId, sessionClaims } = await auth();

  // Extract locale
  const pathSegments = req.nextUrl.pathname.split('/');
  const validLocales = ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'];
  const locale = validLocales.includes(pathSegments[1]) ? pathSegments[1] : 'tr';

  // Admin protection
  if (isAdminRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    if (metadata?.role !== 'superadmin') {
      return Response.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // Dashboard protection
  if (isDashboardRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { hasCompletedProfile?: boolean } | undefined;
    if (!metadata?.hasCompletedProfile && !req.nextUrl.pathname.includes('/uye/profile/complete')) {
      return Response.redirect(new URL(`/${locale}/uye/profile/complete`, req.url));
    }
  }

  // Apply intl routing for protected routes too
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};
