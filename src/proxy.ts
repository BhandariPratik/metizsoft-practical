import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  console.log("Proxy executed:", path, token);

  const publicRoutes = ["/", "/login"];

  const isPublicRoute = publicRoutes.includes(path);

  const isProtectedRoute =path.startsWith("/dashboard") || path.startsWith("/about");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

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
    "/about/:path*"
  ]
};