import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/lib/mockUsers'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams

  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const search = searchParams.get('search') || ''
  const sortBy = searchParams.get('sortBy') || 'id'
  const order = searchParams.get('order') || 'asc'

  let filteredUsers = users.filter((user:any) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  filteredUsers.sort((a: any, b: any) => {
    if (order === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1
    return a[sortBy] < b[sortBy] ? 1 : -1
  })

  const start = (page - 1) * limit
  const paginatedUsers = filteredUsers.slice(start, start + limit)

  return NextResponse.json({
    data: paginatedUsers,
    total: filteredUsers.length
  })
}