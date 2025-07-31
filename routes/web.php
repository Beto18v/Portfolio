<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('Welcome'); // Changed to show portfolio on home page
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Contact form routes
Route::post('/api/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/api/contact', [ContactController::class, 'show'])->name('contact.show');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
