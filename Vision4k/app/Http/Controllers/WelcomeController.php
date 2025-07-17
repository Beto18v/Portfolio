<?php

namespace App\Http\Controllers;

use App\Models\Wallpaper;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        // Obtener wallpapers destacados y recientes
        $wallpapers = Wallpaper::with('category')
            ->where('is_active', true)
            ->latest()
            ->limit(12)
            ->get()
            ->map(function ($wallpaper) {
                return [
                    'id' => $wallpaper->id,
                    'url' => Storage::url($wallpaper->file_path),
                    'description' => $wallpaper->title,
                    'category' => strtolower($wallpaper->category->name ?? 'general'),
                    'tags' => $wallpaper->tags ? explode(',', trim($wallpaper->tags)) : [],
                    'downloads_count' => $wallpaper->downloads_count,
                    'is_premium' => $wallpaper->is_premium,
                ];
            });

        // Obtener categorías activas
        $categories = Category::where('is_active', true)
            ->withCount('wallpapers')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'image' => $category->image ? Storage::url($category->image) : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'wallpaper_count' => $category->wallpapers_count,
                ];
            });

        // Si no hay wallpapers, crear algunos de ejemplo
        if ($wallpapers->isEmpty()) {
            $wallpapers = collect([
                [
                    'id' => 1,
                    'url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                    'description' => 'Montañas al amanecer en 4K',
                    'category' => 'naturaleza',
                    'tags' => ['mountains', 'sunrise', 'landscape', 'nature'],
                    'downloads_count' => 0,
                    'is_premium' => false,
                ],
                [
                    'id' => 2,
                    'url' => 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                    'description' => 'Océano cristalino',
                    'category' => 'naturaleza',
                    'tags' => ['ocean', 'beach', 'water', 'blue'],
                    'downloads_count' => 0,
                    'is_premium' => false,
                ],
                [
                    'id' => 3,
                    'url' => 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                    'description' => 'Ciudad nocturna futurista',
                    'category' => 'urbano',
                    'tags' => ['city', 'night', 'lights', 'urban'],
                    'downloads_count' => 0,
                    'is_premium' => false,
                ],
            ]);
        }

        // Si no hay categorías, crear algunas de ejemplo
        if ($categories->isEmpty()) {
            $categories = collect([
                [
                    'id' => 1,
                    'name' => 'Naturaleza',
                    'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'wallpaper_count' => 150,
                ],
                [
                    'id' => 2,
                    'name' => 'Abstracto',
                    'image' => 'https://images.unsplash.com/photo-1551085254-c51a29bfbcd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'wallpaper_count' => 89,
                ],
                [
                    'id' => 3,
                    'name' => 'Urbano',
                    'image' => 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'wallpaper_count' => 75,
                ],
            ]);
        }

        return Inertia::render('welcome', [
            'wallpapers' => $wallpapers,
            'categories' => $categories,
        ]);
    }
}
