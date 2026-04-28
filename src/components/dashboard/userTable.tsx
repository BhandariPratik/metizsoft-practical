'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './dataTable';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  totalPages: number;
  currentPage: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onPageChange: (page: number) => void;
  onSortingChange: (sortBy: string, order: 'asc' | 'desc') => void;
  onSearchChange: (search: string) => void;
  isLoading?: boolean;
}

const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono">#{row.original.id}</span>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span className="text-gray-600">{row.original.email}</span>,
  },
];

export function UserTable(props: UserTableProps) {
  return <DataTable columns={columns} {...props} />;
}