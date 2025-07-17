import FloatingCategoryMenu from '@/components/floating-category-menu';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import SearchBar from '@/components/search-bar';
import ViewModeToggle from '@/components/view-mode-toggle';
import WallpaperCard from '@/components/wallpaper-card';
import WallpaperModal from '@/components/wallpaper-modal';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

// Definimos la estructura de un Wallpaper
interface Wallpaper {
    id: number;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    category: string;
    tags: string[];
    downloads_count: number;
    views_count: number;
    is_featured: boolean;
    is_premium: boolean;
    created_at: string;
    is_favorited: boolean;
}

interface Category {
    id: number;
    name: string;
    image: string;
    wallpaper_count?: number;
}

interface WelcomePageProps {
    wallpapers: {
        data: Wallpaper[];
        links: any[];
        meta: any;
    };
    categories: Category[];
}

export default function Welcome() {
    const { auth, wallpapers, categories } = usePage<SharedData & WelcomePageProps>().props;
    const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
    const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'name'>('popular');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Filtrar wallpapers
    const filteredWallpapers = (wallpapers?.data || []).filter((wallpaper) => {
        const matchesCategory = selectedCategory === 'all' || wallpaper.category.toLowerCase().includes(selectedCategory);
        const matchesSearch =
            wallpaper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallpaper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallpaper.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    // Ordenar wallpapers
    const sortedWallpapers = [...filteredWallpapers].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            case 'popular':
                return b.downloads_count - a.downloads_count;
            case 'name':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    const handleWallpaperClick = (wallpaper: Wallpaper) => {
        setSelectedWallpaper(wallpaper);
    };

    const handleModalClose = () => {
        setSelectedWallpaper(null);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsLoading(true);
        // Simular un pequeño delay para el efecto de carga
        setTimeout(() => setIsLoading(false), 300);
    };

    return (
        <>
            <Head title="Vision4K - Ultra HD Wallpapers">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-20 h-72 w-72 animate-pulse rounded-full bg-purple-600/10 blur-3xl"></div>
                    <div className="absolute right-20 bottom-40 h-96 w-96 animate-pulse rounded-full bg-pink-600/10 blur-3xl delay-1000"></div>
                    <div className="absolute top-60 right-40 h-80 w-80 animate-pulse rounded-full bg-blue-600/10 blur-3xl delay-2000"></div>
                </div>

                <Header currentPage="home" user={auth.user} />
                <Hero />

                {/* Floating Category Menu */}
                <FloatingCategoryMenu categories={categories} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />

                {/* Filtros y Búsqueda */}
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Buscar wallpapers..." />

                    <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                        <h2 className="mb-4 text-2xl font-bold text-white sm:mb-0">Descubre Wallpapers Increíbles</h2>

                        {/* Controles de vista y ordenamiento */}
                        <div className="flex items-center space-x-4">
                            <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />

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
                </div>

                {/* Grid de wallpapers mejorado */}
                <div id="wallpapers-section" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                        <h2 className="mb-2 text-2xl font-bold text-white sm:mb-0">
                            {selectedCategory === 'all' ? 'Todos los wallpapers' : `Categoría: ${selectedCategory}`}
                        </h2>
                        <div className="flex items-center space-x-4 text-gray-300">
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
                        {sortedWallpapers.map((wallpaper, index) => (
                            <div
                                key={wallpaper.id}
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                    animationFillMode: 'both',
                                }}
                                className="animate-in fade-in slide-in-from-bottom-4"
                            >
                                <WallpaperCard wallpaper={wallpaper} viewMode={viewMode} onClick={handleWallpaperClick} />
                            </div>
                        ))}
                    </div>

                    {/* Mensaje cuando no hay resultados */}
                    {sortedWallpapers.length === 0 && (
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

            {/* Floating Category Menu */}
            <FloatingCategoryMenu categories={categories} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />

            {/* Modal para vista ampliada */}
            <WallpaperModal wallpaper={selectedWallpaper} onClose={handleModalClose} />
        </>
    );
}
