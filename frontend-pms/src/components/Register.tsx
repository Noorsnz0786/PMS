'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import { ClipLoader } from 'react-spinners';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
    const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
    const router = useRouter();
    const { login } = useAuth(); // Access login method from context

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', { name, email, password });
            localStorage.setItem('token', response.data.token); // Save token to localStorage
            login(); // Update global authentication state
            router.push('/dashboard'); // Redirect to dashboard
        } catch (err: any) {
            console.log(err); // Log the full error object for debugging
            if (err.response && err.response.status === 422) {
                // Parse the 'error' key from the response
                setFieldErrors(err.response.data.error || {});
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4">Register</h1>

                {/* Generic Error Message */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Name Field */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                    {fieldErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.name.join(', ')}</p>
                    )}
                </div>

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
                    {fieldErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.email.join(', ')}</p>
                    )}
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
                    {fieldErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.password.join(', ')}</p>
                    )}
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
                        'Register'
                    )}
                </button>
            </form>
        </div>
    );
}