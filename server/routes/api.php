<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReactionController;

/*
|--------------------------------------------------------------------------
| API Routes — Ping Real-Time Messenger
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {
    // Authentication
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    // Protected Routes
    Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
        // Workspaces & Channels
        Route::get('/channels', [ChannelController::class, 'index']);
        Route::post('/channels', [ChannelController::class, 'store']);
        Route::get('/channels/{id}', [ChannelController::class, 'show']);
        
        // Messages & Cursor Pagination
        Route::get('/channels/{channelId}/messages', [MessageController::class, 'index']);
        Route::post('/channels/{channelId}/messages', [MessageController::class, 'store']);
        Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
        
        // Threads
        Route::get('/messages/{id}/thread', [MessageController::class, 'getThread']);
        Route::post('/messages/{id}/thread', [MessageController::class, 'storeThreadReply']);

        // Emoji Reactions
        Route::post('/messages/{id}/reactions', [ReactionController::class, 'toggle']);
    });
});
