import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Liste des routes publiques
const publicRoutes = ["/", "/sign-in", "/sign-up", "/unauthorized"];

export default clerkMiddleware((req) => {
  try {
    // Vérifier si c'est une route publique
    if (publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.next();
    }

    // Vérifier si c'est une route du dashboard
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      // Si non connecté, rediriger vers unauthorized
      if (!req.auth?.userId) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};