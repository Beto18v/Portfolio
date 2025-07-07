// Reutilizamos la definición de Wallpaper
interface Wallpaper {
    id: number;
    url: string;
    description: string;
}

// Definimos las props del modal
interface WallpaperModalProps {
    wallpaper: Wallpaper | null;
    onClose: () => void;
}

export default function WallpaperModal({ wallpaper, onClose }: WallpaperModalProps) {
    if (!wallpaper) return null;

    return (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={onClose}>
            <div className="relative max-h-full max-w-4xl rounded-lg bg-gray-800 p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <img src={wallpaper.url} alt={wallpaper.description} className="max-h-[80vh] max-w-full object-contain" />
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white"
                >
                    &times;
                </button>
                <p className="mt-4 text-center text-white">{wallpaper.description}</p>
            </div>
        </div>
    );
}
