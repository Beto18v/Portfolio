import CategoryCard from '@/components/category-card';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import WallpaperModal from '@/components/wallpaper-modal';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Definimos la estructura de un Wallpaper
interface Wallpaper {
    id: number;
    url: string;
    description: string;
    category: string;
    tags: string[];
}

// Definimos las categorías
interface Category {
    id: number;
    name: string;
    image: string;
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'name'>('newest');
    const [isLoading, setIsLoading] = useState(false);

    // Datos de ejemplo para wallpapers (en una app real, estos vendrían del backend)
    const wallpapers: Wallpaper[] = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Montañas al amanecer en 4K',
            category: 'naturaleza',
            tags: ['mountains', 'sunrise', 'landscape', 'nature'],
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Océano cristalino',
            category: 'naturaleza',
            tags: ['ocean', 'beach', 'water', 'blue'],
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Ciudad nocturna futurista',
            category: 'urbano',
            tags: ['city', 'night', 'lights', 'urban'],
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Galaxia espacial',
            category: 'espacio',
            tags: ['space', 'galaxy', 'stars', 'cosmic'],
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1551085254-c51a29bfbcd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Patrón geométrico abstracto',
            category: 'abstracto',
            tags: ['geometric', 'pattern', 'modern', 'abstract'],
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Bosque misterioso',
            category: 'naturaleza',
            tags: ['forest', 'trees', 'mysterious', 'green'],
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Aurora Boreal',
            category: 'naturaleza',
            tags: ['aurora', 'northern-lights', 'sky', 'nature'],
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Nebulosa colorida',
            category: 'espacio',
            tags: ['nebula', 'space', 'colors', 'cosmic'],
        },
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Rascacielos modernos',
            category: 'urbano',
            tags: ['skyscrapers', 'modern', 'architecture', 'urban'],
        },
        {
            id: 10,
            url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Formas fluidas abstractas',
            category: 'abstracto',
            tags: ['fluid', 'abstract', 'colorful', 'modern'],
        },
        {
            id: 11,
            url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Desierto dorado',
            category: 'naturaleza',
            tags: ['desert', 'sand', 'golden', 'landscape'],
        },
        {
            id: 12,
            url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            description: 'Planeta distante',
            category: 'espacio',
            tags: ['planet', 'space', 'science-fiction', 'cosmic'],
        },
    ];

    const categories: Category[] = [
        {
            id: 1,
            name: 'Naturaleza',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 2,
            name: 'Urbano',
            image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 3,
            name: 'Espacio',
            image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
            id: 4,
            name: 'Abstracto',
            image: 'https://images.unsplash.com/photo-1551085254-c51a29bfbcd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
    ];

    // Filtrar wallpapers basado en categoría y búsqueda
    const filteredWallpapers = wallpapers.filter((wallpaper) => {
        const matchesCategory = selectedCategory === 'all' || wallpaper.category === selectedCategory;
        const matchesSearch =
            wallpaper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallpaper.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const handleWallpaperClick = (wallpaper: Wallpaper) => {
        setSelectedWallpaper(wallpaper);
    };

    const handleModalClose = () => {
        setSelectedWallpaper(null);
    };

    return (
        <>
            <Head title="Vision4K - Wallpapers en 4K">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Header moderno con glassmorphism */}
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/10 blur-3xl"></div>
                    <div className="absolute right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-pink-600/10 blur-3xl delay-1000"></div>
                    <div className="absolute top-60 right-40 h-80 w-80 animate-pulse rounded-full bg-blue-600/10 blur-3xl delay-2000"></div>
                </div>

                <header className="sticky top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            <div className="flex items-center space-x-6">
                                {/* Logo mejorado */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-white">Vision4K</div>
                                        <div className="-mt-1 hidden text-xs text-gray-300 md:block">Ultra HD Wallpapers</div>
                                    </div>
                                </div>

                                {/* Navigation links */}
                                <nav className="hidden items-center space-x-8 lg:flex">
                                    <a href="#" className="group relative text-gray-300 transition-colors duration-300 hover:text-white">
                                        Inicio
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                    <a href="#" className="group relative text-gray-300 transition-colors duration-300 hover:text-white">
                                        Categorías
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                    <a href="#" className="group relative text-gray-300 transition-colors duration-300 hover:text-white">
                                        Trending
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                    <a href="#" className="group relative text-gray-300 transition-colors duration-300 hover:text-white">
                                        Premium
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                </nav>
                            </div>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <div className="hidden items-center space-x-2 text-gray-300 md:flex">
                                            <span className="text-sm">Hola,</span>
                                            <span className="font-medium text-white">{auth.user.name}</span>
                                        </div>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 font-medium text-white transition-colors duration-300 hover:text-purple-300"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>
                                )}

                                {/* Mobile menu button */}
                                <button className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section mejorado */}
                <div className="relative">
                    <Hero />

                    {/* Barra de búsqueda moderna con efectos avanzados */}
                    <div className="relative mx-auto mt-12 max-w-2xl px-4">
                        <div className="group relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 blur-xl transition-all duration-500 group-focus-within:blur-2xl"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar wallpapers increíbles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-lg text-white placeholder-gray-300 backdrop-blur-md transition-all duration-300 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/50 focus:outline-none"
                                />
                                <div className="absolute top-1/2 right-6 flex -translate-y-1/2 transform items-center space-x-3">
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} className="rounded-full p-1 transition-colors hover:bg-white/20">
                                            <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                    <div className="h-6 w-px bg-white/20"></div>
                                    <svg className="h-6 w-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Search suggestions */}
                            {searchTerm && (
                                <div className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-md">
                                    <div className="p-3">
                                        <div className="mb-2 text-xs text-gray-400">Sugerencias populares:</div>
                                        <div className="flex flex-wrap gap-2">
                                            {['nature', 'space', 'abstract', 'city', 'ocean'].map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => setSearchTerm(tag)}
                                                    className="rounded-full bg-purple-600/20 px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-purple-600/40 hover:text-white"
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Estadísticas en tiempo real */}
                    <div className="mx-auto mt-16 max-w-4xl px-4">
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            <div className="group text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="h-8 w-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="mb-1 text-2xl font-bold text-white">{wallpapers.length}+</div>
                                <div className="text-sm text-gray-400">Wallpapers</div>
                            </div>

                            <div className="group text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                </div>
                                <div className="mb-1 text-2xl font-bold text-white">{categories.length}</div>
                                <div className="text-sm text-gray-400">Categorías</div>
                            </div>

                            <div className="group text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                </div>
                                <div className="mb-1 text-2xl font-bold text-white">50K+</div>
                                <div className="text-sm text-gray-400">Descargas</div>
                            </div>

                            <div className="group text-center">
                                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-600/20 to-red-600/20 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="h-8 w-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="mb-1 text-2xl font-bold text-white">4K</div>
                                <div className="text-sm text-gray-400">Ultra HD</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filtros de categorías mejorados */}
                <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <h2 className="mb-4 text-2xl font-bold text-white lg:mb-0">Explorar por categorías</h2>

                        {/* Controles de vista y ordenamiento */}
                        <div className="flex items-center space-x-4">
                            {/* Selector de vista */}
                            <div className="flex items-center rounded-xl bg-white/10 p-1 backdrop-blur-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`rounded-lg p-2 transition-all duration-300 ${
                                        viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                    title="Vista de cuadrícula"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('masonry')}
                                    className={`rounded-lg p-2 transition-all duration-300 ${
                                        viewMode === 'masonry' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                                    title="Vista de mosaico"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Selector de ordenamiento */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular' | 'name')}
                                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            >
                                <option value="newest" className="bg-gray-800">
                                    Más recientes
                                </option>
                                <option value="popular" className="bg-gray-800">
                                    Más populares
                                </option>
                                <option value="name" className="bg-gray-800">
                                    Por nombre
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`rounded-xl p-4 text-center transition-all duration-300 ${
                                selectedCategory === 'all'
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                    : 'bg-white/10 text-gray-300 hover:scale-105 hover:bg-white/20'
                            }`}
                        >
                            <div className="flex flex-col items-center space-y-2">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                <span className="font-medium">Todos</span>
                            </div>
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.name.toLowerCase())}
                                className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                                    selectedCategory === category.name.toLowerCase() ? 'scale-105 ring-2 ring-purple-500' : 'hover:scale-105'
                                }`}
                            >
                                <CategoryCard category={category} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de wallpapers mejorado */}
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                        <h2 className="mb-2 text-2xl font-bold text-white sm:mb-0">
                            {selectedCategory === 'all' ? 'Todos los wallpapers' : `Categoría: ${selectedCategory}`}
                        </h2>
                        <div className="flex items-center space-x-4 text-gray-300">
                            <span className="text-sm">{filteredWallpapers.length} wallpapers encontrados</span>
                            {isLoading && <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-500/30 border-t-purple-500"></div>}
                        </div>
                    </div>

                    {/* Grid adaptativo basado en el modo de vista */}
                    <div
                        className={` ${
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                                : 'columns-1 gap-6 space-y-6 sm:columns-2 md:columns-3 lg:columns-4'
                        } `}
                    >
                        {filteredWallpapers.map((wallpaper, index) => (
                            <div
                                key={wallpaper.id}
                                className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 ${
                                    viewMode === 'masonry' ? 'mb-6 break-inside-avoid' : ''
                                }`}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both',
                                }}
                                onClick={() => handleWallpaperClick(wallpaper)}
                            >
                                <div className={`${viewMode === 'grid' ? 'aspect-video' : 'aspect-auto'} overflow-hidden`}>
                                    <img
                                        src={wallpaper.url}
                                        alt={wallpaper.description}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Overlay con gradiente mejorado */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />

                                {/* Contenido mejorado con animaciones */}
                                <div className="absolute right-0 bottom-0 left-0 translate-y-full transform p-4 text-white transition-all duration-500 group-hover:translate-y-0">
                                    <h3 className="mb-2 line-clamp-1 text-sm font-semibold">{wallpaper.description}</h3>
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        {wallpaper.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-white/20 bg-gradient-to-r from-purple-500/40 to-pink-500/40 px-2 py-1 text-xs backdrop-blur-sm"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Información adicional */}
                                    <div className="flex items-center justify-between text-xs text-gray-300">
                                        <span className="flex items-center space-x-1">
                                            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                            <span>4K Ultra HD</span>
                                        </span>
                                        <span className="capitalize">{wallpaper.category}</span>
                                    </div>
                                </div>

                                {/* Botones de acción mejorados */}
                                <div className="absolute top-2 right-2 flex translate-y-2 transform space-x-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                    <button
                                        className="group/btn rounded-full bg-black/40 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-black/60"
                                        title="Vista previa"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWallpaperClick(wallpaper);
                                        }}
                                    >
                                        <svg
                                            className="h-4 w-4 text-white transition-transform group-hover/btn:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className="group/btn rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 p-2 backdrop-blur-sm transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                                        title="Descargar"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Función de descarga aquí
                                        }}
                                    >
                                        <svg
                                            className="h-4 w-4 text-white transition-transform group-hover/btn:scale-110"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Indicador de calidad */}
                                <div className="absolute top-2 left-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="rounded-full border border-white/20 bg-gradient-to-r from-green-600/80 to-blue-600/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                        4K
                                    </span>
                                </div>

                                {/* Efectos de partículas flotantes */}
                                <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                                    <div
                                        className="absolute top-4 right-6 h-1 w-1 animate-ping rounded-full bg-white/30"
                                        style={{ animationDelay: '0ms' }}
                                    ></div>
                                    <div
                                        className="absolute top-8 right-4 h-2 w-2 animate-pulse rounded-full bg-purple-400/20"
                                        style={{ animationDelay: '200ms' }}
                                    ></div>
                                    <div
                                        className="absolute right-8 bottom-8 h-1 w-1 animate-bounce rounded-full bg-pink-400/30"
                                        style={{ animationDelay: '400ms' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mensaje cuando no hay resultados */}
                    {filteredWallpapers.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-white">No se encontraron wallpapers</h3>
                            <p className="text-gray-400">Prueba con otros términos de búsqueda o categorías</p>
                        </div>
                    )}
                </div>

                <Footer />
            </div>

            {/* Modal para vista ampliada */}
            <WallpaperModal wallpaper={selectedWallpaper} onClose={handleModalClose} />
        </>
    );
}
