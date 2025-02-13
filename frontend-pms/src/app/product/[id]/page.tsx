'use client';

import { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Loading from '../../../components/Loading'; // Import the Loading component
import { isAuthenticated } from '../../../utils/auth'; // Import the isAuthenticated function
import Link from 'next/link';
import { Product } from '@/app/types/product';

export default function ProductDetails() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated()) {
            router.push('/login'); // Redirect to login if not authenticated
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await api.get(`/product/${params.id}`);
                console.log('API Response:', response.data); // Log the response for debugging

                // Extract the product object from the response
                const fetchedProduct = response.data.product;
                setProduct(fetchedProduct);
            } catch (err: any) {
                setError('Failed to fetch product.');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id, router]);

    if (loading) {
        return <Loading message="Fetching product details..." />;
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    if (!product) {
        return <p className="text-center text-gray-400">Product not found.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
            {/* Back Button */}
            <Link href="/dashboard">
                <button
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors mb-6"
                >
                    Back to Dashboard
                </button>
            </Link>

            {/* Product Details */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4"><strong>Name : </strong>{product?.name || 'No Name Available'}</h1>
                <p className="text-gray-400 mb-2"><strong>Category:</strong> {product?.category || 'No Category Available'}</p>
                <p className="text-gray-400 mb-2">
                    <strong>Description:</strong>{' '}
                    {product?.description && typeof product.description === 'string' && product.description.trim() !== ''
                        ? product.description
                        : 'No description available.'}
                </p>
                <p className="text-indigo-400 font-semibold">
                    <strong>Price:</strong>{' '}
                    {product?.price && !isNaN(parseFloat(product.price.toString()))
                        ? `₹ ${parseFloat(product.price.toString()).toFixed(2)}`
                        : 'N/A'}
                </p>
            </div>
        </div>
    );
}
