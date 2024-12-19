import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes publiques qui ne nécessitent pas d'authentification
const publicRoutes = new Set([
  "/",
  "/sign-in",
  "/sign-up",
  "/unauthorized",
  "/api/webhooks/clerk"
]);

export default clerkMiddleware((req) => {
  if (!req.nextUrl) return NextResponse.next();

  const isPublicRoute = publicRoutes.has(req.nextUrl.pathname);
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

  // Autoriser les routes publiques
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Protéger le dashboard
  if (isDashboardRoute && !req.auth?.userId) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!.*\\.|api|_next/static|_next/image|favicon.ico).*)",
  ],
};