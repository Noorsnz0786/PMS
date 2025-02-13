<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    //create a new product
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'category' => 'required|string',
                'price' => 'required|numeric|min:0',
            ]);

            $user = $request->user();

            $product = $user->products()->create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'category' => $validated['category'],
                'price' => $validated['price'],
                'user_id' => $user->id
            ]);

            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //get all products
    public function index(Request $request)
    {
        try {
            $perPage = 10;
            $page = $request->input('page', 1);
            $search = $request->input('search', '');

            // Fetch products with optional search and pagination
            $products = Product::when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%");
            })
                ->orderByDesc('created_at')
                ->paginate($perPage, ['*'], 'page', $page);

            return response()->json([
                'message' => "Retrieved successfully",
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    //get a product
    public function show($id)
    {
        try {
            $product = Product::with(['user:id,name'])->findOrFail($id);

            return response()->json([
                'message' => 'Retrieved successfully',
                'product' => $product
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //update a product AND only authenticated user can update and only product owner can update
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'description' => 'sometimes|string|nullable',
                'category' => 'sometimes|string',
                'price' => 'sometimes|numeric|min:0',
            ]);

            $product = Product::findOrFail($id);

            // Check if authenticated user is the owner of the product
            if ($product->user_id !== auth()->id()) {
                return response()->json([
                    'message' => 'You are not the owner of this product'
                ], 403);
            }
            // Update product with only provided fields
            $product->update($validated);

            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }
         catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    //delete a product
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            // Check if authenticated user is the owner of the product
            if ($product->user_id !== auth()->id()) {
                return response()->json([
                    'message' => 'You are not the owner of this product'
                ], 403);
            }

            $product->delete();

            return response()->json([
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function userProducts()
    {
        $userId = auth()->id();
        $products = Product::where('user_id', $userId)->get()->map(function ($product) {
            $product->price = (float) $product->price; // Convert price to a float
            return $product;
        });
        return response()->json(['products' => $products], 200);
    }


}
