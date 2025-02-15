<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/products',[ProductController::class, 'index']);
Route::get('/product/{id}',[ProductController::class, 'show']);

//protected routes
Route::middleware('auth:api')->group(function(){
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/product',[ProductController::class, 'store']);
    Route::put('/product/{id}',[ProductController::class, 'update']);
    Route::delete('/product/{id}',[ProductController::class, 'destroy']);
    Route::get('/user/products', [ProductController::class, 'userProducts']);
});
