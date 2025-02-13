'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import api from '@/utils/api';

export default function AddProductPage() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        console.log('Checking authentication status...'); // Log authentication check
        if (!isLoggedIn) {
            console.log('User is not authenticated. Redirecting to login...');
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log('Submitting product data:', { name, category, description, price }); // Log the submitted data
            const response = await api.post('/product', {
                name,
                category,
                description,
                price,
            });
            console.log('API Response:', response.data); // Log the API response
            router.push('/dashboard'); // Redirect to dashboard after adding the product
        } catch (err: any) {
            console.error('Error adding product:', err); // Log the error
            setError('Failed to add product.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-white">Add Product</h1>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:border-indigo-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
