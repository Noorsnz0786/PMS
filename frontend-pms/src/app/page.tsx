'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-indigo-600">Welcome to Product Management System</h1>
        <p className="text-lg text-gray-700">
          Manage your products effortlessly with our intuitive platform.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex space-x-4 mt-6  justify-center">
          <Link href="/login">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Login
            </button>
          </Link>

          <Link href="/register">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Register
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="text-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-semibold">Easy to Use</h3>
            <p className="text-gray-600">Our platform is designed for simplicity and efficiency.</p>
          </div>

          {/* Feature 2 */}
          <div className="text-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <h3 className="font-semibold">Secure</h3>
            <p className="text-gray-600">Your data is protected with industry-standard security.</p>
          </div>

          {/* Feature 3 */}
          <div className="text-center space-y-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <h3 className="font-semibold">Scalable</h3>
            <p className="text-gray-600">Grow your business with our flexible tools.</p>
          </div>
        </div>
      </div>
    </div>
  );
}