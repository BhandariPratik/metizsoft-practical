export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow max-w-xl">
        <h1 className="text-3xl font-bold mb-4">
          About Us
        </h1>

        <p className="text-gray-600">
          This is a protected static page created to demonstrate
          route protection in Next.js middleware.
        </p>
      </div>
    </div>
  )
}