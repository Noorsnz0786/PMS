'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/utils/api';
import Loading from '@/components/Loading';

export default function OwnerProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await api.get('/user/products');
                const productsWithNumericPrice = response.data.products.map((product: any) => ({
                    ...product,
                    price: parseFloat(product.price),
                }));
                setProducts(productsWithNumericPrice);
            } catch (err: any) {
                setError('Failed to fetch your products.');
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchUserProducts();
        } else {
            router.push('/login');
        }
    }, [isLoggedIn, router]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await api.delete(`/product/${id}`);
            setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
        } catch (err: any) {
            alert('Failed to delete product.');
        }
    };

    const handleSave = async (id: number) => {
        const productToUpdate = products.find((p) => p.id === id);
        if (!productToUpdate) return;

        try {
            await api.put(`/product/${id}`, {
                name: productToUpdate.name,
                category: productToUpdate.category,
                description: productToUpdate.description,
                price: productToUpdate.price,
            });
            setEditingProductId(null);
        } catch (err: any) {
            alert('Failed to update product.');
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className="text-center text-red-400">{error}</p>;
    }

    return (
        <div className="bg-gray-900 text-white p-6 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Your Products</h2>
            <table className="w-full border-collapse border border-gray-700">
                <thead>
                    <tr className="bg-gray-800 text-gray-300">
                        <th className="border border-gray-700 px-4 py-2">Name</th>
                        <th className="border border-gray-700 px-4 py-2">Category</th>
                        <th className="border border-gray-700 px-4 py-2">Description</th>
                        <th className="border border-gray-700 px-4 py-2">Price</th>
                        <th className="border border-gray-700 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product.id} className="hover:bg-gray-800 transition">
                            <td className="border border-gray-700 px-4 py-2">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        value={product.name}
                                        onChange={(e) =>
                                            setProducts((prevProducts) =>
                                                prevProducts.map((p) =>
                                                    p.id === product.id ? { ...p, name: e.target.value } : p
                                                )
                                            )
                                        }
                                        className="w-full bg-gray-800 text-white px-2 py-1 border rounded-md"
                                    />
                                ) : (
                                    product.name
                                )}
                            </td>
                            <td className="border border-gray-700 px-4 py-2">
                                {editingProductId === product.id ? (
                                    <input
                                        type="text"
                                        value={product.category}
                                        onChange={(e) =>
                                            setProducts((prevProducts) =>
                                                prevProducts.map((p) =>
                                                    p.id === product.id ? { ...p, category: e.target.value } : p
                                                )
                                            )
                                        }
                                        className="w-full bg-gray-800 text-white px-2 py-1 border rounded-md"
                                    />
                                ) : (
                                    product.category
                                )}
                            </td>
                            <td className="border border-gray-700 px-4 py-2">
                                {editingProductId === product.id ? (
                                    <textarea
                                        value={product.description}
                                        onChange={(e) =>
                                            setProducts((prevProducts) =>
                                                prevProducts.map((p) =>
                                                    p.id === product.id ? { ...p, description: e.target.value } : p
                                                )
                                            )
                                        }
                                        className="w-full bg-gray-800 text-white px-2 py-1 border rounded-md"
                                    />
                                ) : (
                                    product.description
                                )}
                            </td>
                            <td className="border border-gray-700 px-4 py-2">
                                {editingProductId === product.id ? (
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={product.price}
                                        onChange={(e) =>
                                            setProducts((prevProducts) =>
                                                prevProducts.map((p) =>
                                                    p.id === product.id ? { ...p, price: parseFloat(e.target.value) } : p
                                                )
                                            )
                                        }
                                        className="w-full bg-gray-800 text-white px-2 py-1 border rounded-md"
                                    />
                                ) : (
                                    `₹ ${product.price.toFixed(2)}`
                                )}
                            </td>
                            <td className="border border-gray-700 px-4 py-2 flex space-x-2">
                                {editingProductId === product.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(product.id)}
                                            className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingProductId(null)}
                                            className="px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setEditingProductId(product.id)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
