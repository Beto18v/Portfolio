<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome'); // Portfolio home page
})->name('home');

Route::post('/contact', [ContactController::class, 'store']);
Route::get('/contact', [ContactController::class, 'show']);
