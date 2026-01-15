import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['tr', 'en', 'ru', 'ar', 'zh'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed'
});

const isProtectedRoute = createRouteMatcher([
  '/(tr|en|ru|ar|zh)?/uye/dashboard(.*)',
  '/(tr|en|ru|ar|zh)?/uye/firma-tanimla(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  return intlMiddleware(req as NextRequest);
});

export const config = {
  matcher: ['/((?!api|_next|.*\..*).*)']
};
