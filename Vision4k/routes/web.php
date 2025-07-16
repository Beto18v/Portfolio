<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WallpaperController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard routes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/wallpapers', [DashboardController::class, 'store'])->name('dashboard.store');
    Route::put('/dashboard/wallpapers/{wallpaper}', [DashboardController::class, 'update'])->name('dashboard.wallpapers.update');
    Route::delete('/dashboard/wallpapers/{wallpaper}', [DashboardController::class, 'destroy'])->name('dashboard.wallpapers.destroy');
    Route::post('/dashboard/categories', [DashboardController::class, 'storeCategory'])->name('dashboard.categories.store');
    Route::get('/dashboard/analytics', [DashboardController::class, 'analytics'])->name('dashboard.analytics');
});

// Public wallpaper routes
Route::get('/wallpapers', [WallpaperController::class, 'index'])->name('wallpapers.index');
Route::get('/wallpapers/{wallpaper}', [WallpaperController::class, 'show'])->name('wallpapers.show');
Route::get('/wallpapers/{wallpaper}/download', [WallpaperController::class, 'download'])->name('wallpapers.download');
Route::get('/categories/{category}', [WallpaperController::class, 'category'])->name('wallpapers.category');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
