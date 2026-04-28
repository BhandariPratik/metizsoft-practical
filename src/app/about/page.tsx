'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.includes('auth_token');
    setIsAuthenticated(token);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">About</h1>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Application
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              This is a demo application showcasing a Next.js implementation with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Authentication using JWT tokens</li>
              <li>Protected routes with middleware</li>
              <li>Server-side data table with pagination, sorting, and filtering</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>TanStack Table for advanced table features</li>
            </ul>
            <p className="mt-4">
              The dashboard displays mock user data with server-side processing.
              You can sort by any column, search by name/email, and navigate
              through pages - all handled on the server side.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Demo Credentials:</strong><br />
                Email: admin@example.com<br />
                Password: password123
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}