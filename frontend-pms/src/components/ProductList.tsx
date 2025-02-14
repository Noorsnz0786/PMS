'use client';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Product } from '@/app/types/product';
import Link from 'next/link';
import Loading from '@/components/Loading';

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 10,
    });
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [searchInput, setSearchInput] = useState(''); // State for input field

    // Fetch products for a specific page and search term
    const fetchProducts = async (page: number, search: string) => {
        setLoading(true);
        try {
            const response = await api.get(`/products?page=${page}&search=${encodeURIComponent(search)}`);
            const fetchedProducts = response.data.products?.data || [];
            const totalPages = response.data.products?.last_page || 1;

            setProducts(fetchedProducts); // Store the fetched products in state
            setPagination({
                currentPage: response.data.products?.current_page || 1,
                lastPage: totalPages,
                perPage: response.data.products?.per_page || 10,
            });
        } catch (err: any) {
            setError('Failed to fetch products.');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchProducts(1, searchTerm); // Fetch the first page with the current search term
    }, []);

    // Handle page change
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.lastPage) {
            fetchProducts(newPage, searchTerm); // Fetch the new page with the current search term
        }
    };

    // Handle search button click
    const handleSearch = () => {
        setSearchTerm(searchInput); // Update the search term
        fetchProducts(1, searchInput); // Reset to the first page and fetch products with the new search term
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Products</h2>

            {/* Search Bar */}
            <div className="mb-6 flex justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full max-w-md px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:border-indigo-500"
                />
                <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
                    {/* Table Header */}
                    <thead className="bg-indigo-700 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-600">Sr No.</th> {/* Serial Number Column */}
                            <th className="py-3 px-4 border-b border-gray-600">Name</th>
                            <th className="py-3 px-4 border-b border-gray-600">Category</th>
                            <th className="py-3 px-4 border-b border-gray-600">Description</th>
                            <th className="py-3 px-4 border-b border-gray-600">Price</th>
                            <th className="py-3 px-4 border-b border-gray-600">Created At</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => {
                                // Calculate the serial number based on the current page and index
                                const serialNumber =
                                    (pagination.currentPage - 1) * pagination.perPage + index + 1;

                                return (
                                    <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                                        <td className="py-3 px-4 text-center">{serialNumber}</td> {/* Serial Number */}
                                        <td className="py-3 px-4 text-center">
                                            <Link href={`/product/${product.id}`} className="text-indigo-400 hover:underline">
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="py-3 px-4 text-center">{product.category}</td>
                                        <td className="py-3 px-4 text-center">
                                            {product.description || 'No description available.'}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            ₹ {parseFloat(product.price.toString()).toFixed(0)}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-4 text-center text-gray-400">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* //  Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-400">
                    Page {pagination.currentPage} of {pagination.lastPage}
                </span>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.lastPage}
                    className="px-4 py-2 bg-red-600 text-white rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}