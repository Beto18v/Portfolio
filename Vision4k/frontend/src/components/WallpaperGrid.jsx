// ... (imports previos)

const WallpaperGrid = () => {
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchWallpapers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = searchQuery
          ? `http://localhost:3001/api/wallpapers/search?q=${encodeURIComponent(
              searchQuery
            )}`
          : "http://localhost:3001/api/wallpapers";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch wallpapers");
        const data = await response.json();
        setWallpapers(data);
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchWallpapers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // ... (resto del código)

  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (isLoading) return <div className="text-center py-12">Loading...</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
          Featured Wallpapers
        </h2>

        {/* Añade campo de búsqueda */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search wallpapers..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* ... (resto del renderizado) */}
      </div>
    </>
  );
};

export default WallpaperGrid;
