<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;

Route::get('/', function () {
    return Inertia::render('Welcome'); // Portfolio home page
})->name('home');

// Contact form routes
Route::post('/api/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/api/contact', [ContactController::class, 'show'])->name('contact.show');
