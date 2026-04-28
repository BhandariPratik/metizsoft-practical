import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // mock validation
  if (email === "admin@gmail.com" && password === "123456") {

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({
      message: "Login successful"
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.ENV === "production",
      path: "/",
      sameSite: "lax"
    });
    return response;
  }

  return NextResponse.json(
    { message: "Invalid credentials" },
    { status: 401 }
  );
}