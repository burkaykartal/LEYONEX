import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/hakkimizda(.*)",
  "/hizmetler(.*)",
  "/projeler(.*)",
  "/fuarlar(.*)",
  "/iletisim(.*)",
  "/teklif-al(.*)",
  "/giris(.*)",
  "/kayit(.*)",
  "/api/contact(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/uye/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Public routes'a herkes erişebilir
  if (isPublicRoute(req)) {
    return NextResponse.next();
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

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
