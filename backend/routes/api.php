<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);

    Route::prefix('tareas')->group(function () {
        Route::get('/', [TareaController::class, 'index']);
        Route::post('/', [TareaController::class, 'store']);
        Route::get('/{tarea}', [TareaController::class, 'show']);
        Route::put('/{tarea}', [TareaController::class, 'update']);
        Route::delete('/{tarea}', [TareaController::class, 'destroy']);
    });
    
    Route::prefix('estados')->group(function () {
        Route::get('/', [EstadoController::class, 'index']);
        Route::post('/', [EstadoController::class, 'store']);
        Route::get('/{estado}', [EstadoController::class, 'show']);
        Route::put('/{estado}', [EstadoController::class, 'update']);
        Route::delete('/{estado}', [EstadoController::class, 'destroy']);
    });
});

