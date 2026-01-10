import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Admin routes matcher
const isAdminRoute = createRouteMatcher([
  '/:locale/uye/admin/:path*',
  '/uye/admin/:path*',
]);

// Dashboard routes matcher
const isDashboardRoute = createRouteMatcher([
  '/:locale/uye/dashboard/:path*',
  '/uye/dashboard/:path*',
]);

// Public routes - no auth needed
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
  '/hakkimizda',
  '/hizmetler(.*)',
  '/projeler(.*)',
  '/fuarlar(.*)',
  '/iletisim',
  '/teklif-al',
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes and API - no auth needed
  if (isPublicRoute(req) || req.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  const { userId, sessionClaims } = await auth();

  // Extract locale from URL
  const pathSegments = req.nextUrl.pathname.split('/');
  const validLocales = ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'];
  const locale = validLocales.includes(pathSegments[1]) ? pathSegments[1] : 'tr';

  // Admin route protection
  if (isAdminRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }

    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    if (publicMetadata?.role !== 'superadmin') {
      return Response.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // Dashboard route protection
  if (isDashboardRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }

    const publicMetadata = sessionClaims?.publicMetadata as { hasCompletedProfile?: boolean } | undefined;
    const isProfilePage = req.nextUrl.pathname.includes('/uye/profile/complete');

    if (!publicMetadata?.hasCompletedProfile && !isProfilePage) {
      return Response.redirect(new URL(`/${locale}/uye/profile/complete`, req.url));
    }
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};
