'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import { ClipLoader } from 'react-spinners';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
    const router = useRouter();
    const { login } = useAuth(); // Access login method from context

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setIsLoading(true); // Start loading

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token); // Save token to localStorage
            login(); // Update global authentication state
            router.push('/dashboard'); // Redirect to dashboard
        } catch (err: any) {
            console.log(err); // Log the full error object for debugging
            if (err.response && err.response.status === 401) {
                // Use the 'message' field from the backend response
                setError(err.response.data.message || 'Invalid credentials');
            } else {
                setError('password doesnt match');
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>

                {/* Submit Button with Spinner */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors flex justify-center items-center"
                >
                    {isLoading ? (
                        <ClipLoader color="#fff" size={20} />
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    );
}