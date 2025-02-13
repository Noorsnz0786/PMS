'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="bg-[#121212] text-[#e0e0e0] py-4 px-6 flex justify-between items-center shadow-md">
            {/* Dashboard Link */}
            <div>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="text-lg font-bold hover:text-gray-400 transition-colors"
                >
                    Dashboard
                </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
                {!isLoggedIn && (
                    <>
                        <Link href="/login">
                            <button className="px-4 py-2 bg-[#d32f2f] text-white rounded-md hover:bg-[#b71c1c] transition-all duration-300 shadow-sm">
                                Login
                            </button>
                        </Link>
                        <Link href="/register">
                            <button className="px-4 py-2 bg-[#388e3c] text-white rounded-md hover:bg-[#2e7d32] transition-all duration-300 shadow-sm">
                                Register
                            </button>
                        </Link>
                    </>
                )}

                {isLoggedIn && (
                    <>
                        <Link href="/product/add">
                            <button className="px-4 py-2 bg-[#1976d2] text-white rounded-md hover:bg-[#1565c0] transition-all duration-300 shadow-sm">
                                Add Product
                            </button>
                        </Link>
                        <Link href="/owner-products">
                            <button className="px-4 py-2 bg-[#7b1fa2] text-white rounded-md hover:bg-[#6a1b9a] transition-all duration-300 shadow-sm">
                                My Products
                            </button>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-[#d32f2f] text-white rounded-md hover:bg-[#b71c1c] transition-all duration-300 shadow-sm"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
