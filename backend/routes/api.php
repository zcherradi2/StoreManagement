<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryController;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/stores', function () {
    return \App\Models\Store::all();
});


Route::apiResource('inventory', InventoryController::class);
