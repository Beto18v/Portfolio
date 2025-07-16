<?php

namespace App\Http\Controllers;

use App\Models\Wallpaper;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WallpaperController extends Controller
{
    public function index(Request $request)
    {
        $query = Wallpaper::with('category')->active();

        // Filtros
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('tags', 'LIKE', "%{$search}%");
            });
        }

        if ($request->has('featured')) {
            $query->featured();
        }

        // Ordenamiento
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'popular':
                $query->orderBy('downloads_count', 'desc');
                break;
            case 'oldest':
                $query->oldest();
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        $wallpapers = $query->paginate(12)->through(function ($wallpaper) {
            return [
                'id' => $wallpaper->id,
                'title' => $wallpaper->title,
                'description' => $wallpaper->description,
                'image_url' => $wallpaper->image_url,
                'thumbnail_url' => $wallpaper->thumbnail_url,
                'category' => [
                    'id' => $wallpaper->category->id,
                    'name' => $wallpaper->category->name,
                    'slug' => $wallpaper->category->slug,
                ],
                'tags' => $wallpaper->tags_array,
                'resolution' => $wallpaper->resolution,
                'downloads_count' => $wallpaper->downloads_count,
                'is_featured' => $wallpaper->is_featured,
                'created_at' => $wallpaper->created_at->format('Y-m-d H:i:s'),
            ];
        });

        $categories = Category::active()
            ->withCount('wallpapers')
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'wallpapers_count' => $category->wallpapers_count,
                ];
            });

        return Inertia::render('Wallpapers/Index', [
            'wallpapers' => $wallpapers,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search', 'featured', 'sort']),
        ]);
    }

    public function show(Wallpaper $wallpaper)
    {
        $wallpaper->load('category');

        // Wallpapers relacionados
        $related = Wallpaper::active()
            ->where('category_id', $wallpaper->category_id)
            ->where('id', '!=', $wallpaper->id)
            ->inRandomOrder()
            ->limit(6)
            ->get()
            ->map(function ($w) {
                return [
                    'id' => $w->id,
                    'title' => $w->title,
                    'thumbnail_url' => $w->thumbnail_url,
                    'downloads_count' => $w->downloads_count,
                ];
            });

        return Inertia::render('Wallpapers/Show', [
            'wallpaper' => [
                'id' => $wallpaper->id,
                'title' => $wallpaper->title,
                'description' => $wallpaper->description,
                'image_url' => $wallpaper->image_url,
                'category' => [
                    'id' => $wallpaper->category->id,
                    'name' => $wallpaper->category->name,
                    'slug' => $wallpaper->category->slug,
                ],
                'tags' => $wallpaper->tags_array,
                'resolution' => $wallpaper->resolution,
                'file_size' => $wallpaper->file_size,
                'downloads_count' => $wallpaper->downloads_count,
                'created_at' => $wallpaper->created_at->format('Y-m-d H:i:s'),
            ],
            'related' => $related,
        ]);
    }

    public function download(Wallpaper $wallpaper)
    {
        // Incrementar contador de descargas
        $wallpaper->incrementDownloads();

        // Retornar archivo para descarga
        return Storage::disk('public')->download(
            $wallpaper->file_path,
            $wallpaper->title . '.' . pathinfo($wallpaper->file_path, PATHINFO_EXTENSION)
        );
    }

    public function category(Category $category)
    {
        $wallpapers = $category->activeWallpapers()
            ->latest()
            ->paginate(12)
            ->through(function ($wallpaper) {
                return [
                    'id' => $wallpaper->id,
                    'title' => $wallpaper->title,
                    'description' => $wallpaper->description,
                    'thumbnail_url' => $wallpaper->thumbnail_url,
                    'tags' => $wallpaper->tags_array,
                    'resolution' => $wallpaper->resolution,
                    'downloads_count' => $wallpaper->downloads_count,
                    'created_at' => $wallpaper->created_at->format('Y-m-d H:i:s'),
                ];
            });

        return Inertia::render('Wallpapers/Category', [
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
            ],
            'wallpapers' => $wallpapers,
        ]);
    }
}
