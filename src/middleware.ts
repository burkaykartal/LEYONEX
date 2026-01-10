import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Create next-intl middleware
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

const isAdminRoute = createRouteMatcher(['/:locale/uye/admin/:path*']);
const isDashboardRoute = createRouteMatcher(['/:locale/uye/dashboard/:path*']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Skip intl middleware for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  const { userId, sessionClaims } = await auth();

  // Extract locale for auth redirects
  const pathSegments = req.nextUrl.pathname.split('/');
  const locale = locales.includes(pathSegments[1] as any) ? pathSegments[1] : defaultLocale;

  // Admin route protection
  if (isAdminRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    if (metadata?.role !== 'superadmin') {
      return Response.redirect(new URL(`/${locale}`, req.url));
    }
  }

  // Dashboard route protection
  if (isDashboardRoute(req)) {
    if (!userId) {
      return Response.redirect(new URL(`/${locale}/giris?redirect_url=${encodeURIComponent(req.url)}`, req.url));
    }
    const metadata = sessionClaims?.publicMetadata as { hasCompletedProfile?: boolean } | undefined;
    if (!metadata?.hasCompletedProfile && !req.nextUrl.pathname.includes('/uye/profile/complete')) {
      return Response.redirect(new URL(`/${locale}/uye/profile/complete`, req.url));
    }
  }

  // Apply intl middleware to all non-API requests
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)']
};
