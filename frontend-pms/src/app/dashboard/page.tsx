// src/app/dashboard/page.tsx

'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '@/utils/auth';
import ProductList from '@/components/ProductList';
import Loading from '@/components/Loading';
import { motion } from 'framer-motion';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true); // State to handle loading
    const [isClient, setIsClient] = useState(false); // State to track if we're on the client side

    useEffect(() => {
        // Set isClient to true after component mounts
        setIsClient(true);

        // Redirect to login if not authenticated
        if (!isAuthenticated()) {
            router.push('/login');
        } else {
            setIsLoading(false); // Stop loading once authentication is confirmed
        }
    }, [router]);

    // Show a loading state while checking authentication
    if (!isClient || isLoading) {
        return <Loading />;
    }

    return (
        <motion.div
            className="min-h-screen bg-gray-900 text-gray-200 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            {/* Animated Heading */}
            <motion.h1
                className="text-3xl font-bold text-center mb-6 text-indigo-400"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                Welcome to Your Dashboard
            </motion.h1>

            {/* Animated Product List */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <ProductList />
            </motion.div>
        </motion.div>
    );
}