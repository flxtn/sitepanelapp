<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DomainController;
use App\Http\Controllers\HostingController;
use App\Http\Controllers\IndexController;
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


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('two-factor-qr', [AuthController::class, 'EnableTwoFa']);
Route::post('two-factor-login', [AuthController::class, 'TwoFactorLogin']);


Route::middleware("api")->group(function(){
    Route::get('/sites', [IndexController::class, 'index']);
    Route::get('/domains', [DomainController::class, 'index']);
    Route::get('/getme', [AuthController::class, 'GetMe']);
    Route::post('/create-domain', [DomainController::class, 'create']);
    Route::delete('/delete-domain/{id}', [DomainController::class, 'delete']);
    Route::put('/domains/{id}', [DomainController::class, 'update']);
    Route::get('/hostings', [HostingController::class, 'index']);
    Route::post('/create-hosting', [HostingController::class, 'create']);
    Route::delete('/delete-hosting/{id}', [HostingController::class, 'delete']);
    Route::put('/hostings/{id}', [HostingController::class, 'update']);
});
