import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value


  const publicRoutes = ["/login","/"];
  const protectedRoutes = ["/dashboard", "/about"];

  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = protectedRoutes.includes(path);

  // If user tries protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in user tries login again
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/dashboard/:path*",
    "/profile/:path*"
  ],
};