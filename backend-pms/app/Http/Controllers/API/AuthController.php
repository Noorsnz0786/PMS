<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // Register new user
    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'string|required',
                'email' => 'string|email|required|unique:users',
                'password' => 'string|required|min:8|max:40',
            ]);

            // Hash the password
            $validated['password'] = Hash::make($validated['password']);


            // Create new user
            $newUser = User::create($validated);

            // Generate JWT token
            $token = JWTAuth::fromUser($newUser);

            return response()->json([
                'message' => 'User created successfully',
                'user' => $newUser,
                'token' => $token,
                'status' => 201,
                'success' => true
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    // Login user
    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'string|email|required',
                'password' => 'string|required|min:8|max:40',
            ]);

            if (!$token = JWTAuth::attempt($validated)) {
                return response()->json([
                    'message' => 'Invalid credentials',
                    'status' => 401,
                    'success' => false
                ], 401);
            }

            return response()->json([
                'message' => 'User logged in successfully',
                'token' => $token
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong!'], 500);
        }
    }

    // Logout user
    public function logout(Request $request)
    {
        try {
            // Parse and invalidate the token from the Authorization header
            JWTAuth::parseToken()->invalidate();

            return response()->json([
                'message' => 'User logged out successfully',
                'status' => 200,
                'success' => true
            ], 200);

        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Error logging out user',
                'status' => 500,
                'success' => false
            ], 500);
        }
    }
}
