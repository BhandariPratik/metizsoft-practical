import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful"
  });

  response.cookies.set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return response;
}