import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const { email, password } = body

  if (email === 'admin@gmail.com' && password === '123456') {
    const response = NextResponse.json({
      success: true,
      message: 'Login successful'
    })

    response.cookies.set('auth_token', 'dummy_token', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60
    })

    return response
  }

  return NextResponse.json(
    {
      success: false,
      message: 'Invalid credentials'
    },
    { status: 401 }
  )
}