import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const isAuthenticated = Boolean((await cookies()).get('auth_token')?.value);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Metizsoft Practical
          </h1>
          <div className="flex gap-4 justify-center">
            <Link
              href={isAuthenticated ? '/dashboard' : '/login'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
