'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegisterPage from '@/components/Register';

export default function Page() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // If the user is logged in, show a custom message with options
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">You are already logged in.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token'); // Clear the token
              window.location.reload(); // Reload the page to reflect changes
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If the user is not logged in, render the registration form
  return (
    <div>
      <RegisterPage />
    </div>
  );
}