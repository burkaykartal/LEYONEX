import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/:locale/uye/admin/:path*']);
const isDashboardRoute = createRouteMatcher(['/:locale/uye/dashboard/:path*']);

export default clerkMiddleware(async (auth, req) => {
  // Skip auth checks for API and public routes
  if (req.nextUrl.pathname.startsWith('/api') ||
      req.nextUrl.pathname.match(/^\/(tr|en|it|ar|ru|de|es|fr|zh)?\/(hakkimizda|hizmetler|projeler|fuarlar|iletisim|teklif-al|giris|kayit)/) ||
      req.nextUrl.pathname === '/' ||
      req.nextUrl.pathname.match(/^\/(tr|en|it|ar|ru|de|es|fr|zh)\/?$/)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims } = await auth();
  const pathSegments = req.nextUrl.pathname.split('/');
  const validLocales = ['tr', 'en', 'it', 'ar', 'ru', 'de', 'es', 'fr', 'zh'];
  const locale = validLocales.includes(pathSegments[1]) ? pathSegments[1] : 'tr';

  // Admin route protection
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    if (metadata?.role !== 'superadmin') {
      return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // Dashboard route protection
  if (isDashboardRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { hasCompletedProfile?: boolean } | undefined;
    if (!metadata?.hasCompletedProfile && !req.nextUrl.pathname.includes('/uye/profile/complete')) {
      return NextResponse.redirect(new URL(`/${locale}/uye/profile/complete`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};
