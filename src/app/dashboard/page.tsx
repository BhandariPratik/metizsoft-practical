'use client'

import { useEffect, useState } from 'react'
import { DataTable } from '@/components/DataTable'
import LogoutButton from '@/components/LogoutButton'
import Link from 'next/link'
import { User } from '@/lib/types'

type SortOrder = 'asc' | 'desc'

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const [sortBy, setSortBy] = useState('id')
  const [order, setOrder] = useState<SortOrder>('asc')

  const limit = 10

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(
        `/api/users?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&order=${order}`
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      setUsers(data.data)
      setTotal(data.total)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search, sortBy, order])

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    }
  ]

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex gap-3">
            <Link
              href="/about"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              About Us
            </Link>

            <LogoutButton />
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="border px-4 py-2 rounded"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-4 py-2 rounded"
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as SortOrder)}
            className="border px-4 py-2 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {loading && (
          <div className="text-center bg-white p-10 rounded shadow">
            Loading users...
          </div>
        )}

        {!loading && users.length === 0 && (
          <div className="bg-white p-10 text-center rounded shadow">
            No users found
          </div>
        )}

        {!loading && users.length > 0 && (
          <div className="bg-white rounded shadow overflow-hidden">
            <DataTable data={users} columns={columns} />
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}