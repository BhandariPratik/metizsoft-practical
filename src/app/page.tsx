import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Next.js Assessment Home Page
      </h1>

      <p className="text-gray-600">
        Navigate to different pages
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </Link>

        <Link
          href="/dashboard"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/about"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          About-us
        </Link>
      </div>
    </div>
  );
}