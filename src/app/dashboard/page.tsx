'use client';

import { useState, useEffect } from 'react';
import { UserTable } from '@/components/dashboard/userTable';
import { TableSkeleton } from '@/components/dashboard/tableSkeleton';
import { LogoutButton } from '@/components/auth/logoutButton';
import { User } from '@/lib/type';

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            setIsLoading(true);
            setError('');

            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                sortBy,
                order: sortOrder,
                search: searchTerm,
            });

            const response = await fetch(`/api/users?${params}`);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = '/login';
                    return;
                }
                throw new Error(data.message || 'Failed to fetch users');
            }

            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, sortBy, sortOrder, searchTerm]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSortingChange = (newSortBy: string, newOrder: 'asc' | 'desc') => {
        setSortBy(newSortBy);
        setSortOrder(newOrder);
        setCurrentPage(1);
    };

    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        setCurrentPage(1);
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                        <LogoutButton />
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Users</h2>
                        {isLoading ? (
                            <TableSkeleton />
                        ) : (
                            <UserTable
                                users={users}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                                onPageChange={handlePageChange}
                                onSortingChange={handleSortingChange}
                                onSearchChange={handleSearchChange}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}