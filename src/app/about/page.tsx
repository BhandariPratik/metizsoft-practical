import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">
          About Us
        </h1>

        <p className="text-gray-600 mb-6">
          This is a protected static page created to demonstrate
          route protection in Next.js proxy.
        </p>

        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}