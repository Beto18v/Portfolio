import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX, FiEye } from "react-icons/fi";

const WallpaperModal = ({ wallpaper, relatedWallpapers, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative max-w-6xl w-full bg-gray-800 rounded-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Imagen principal */}
          <div className="lg:w-2/3 relative">
            <img
              src={wallpaper.url}
              alt={wallpaper.title}
              className="w-full h-full max-h-[80vh] object-contain"
            />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
              <button className="px-4 py-2 bg-purple-600 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
                <FiEye /> Preview Full
              </button>
              <a
                href={wallpaper.url}
                download
                className="px-4 py-2 bg-cyan-500 rounded-lg flex items-center gap-2 hover:bg-cyan-600 transition-colors"
              >
                <FiDownload /> Download 4K
              </a>
            </div>
          </div>

          {/* Miniaturas relacionadas */}
          <div className="lg:w-1/3 bg-gray-900 p-4 overflow-y-auto max-h-[80vh]">
            <h3 className="text-xl font-bold mb-4 text-white">
              Related Wallpapers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {relatedWallpapers.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FiEye className="text-white text-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-900/50 rounded-full p-2 hover:bg-gray-700 transition-colors"
          >
            <FiX className="text-white text-xl" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WallpaperModal;
