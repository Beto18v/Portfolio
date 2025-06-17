import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBorder from "./AnimatedBorder";

const categories = ["3D", "Cartoons", "Manga", "Comics", "Fantasy"];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-to-b from-gray-900 to-gray-800 py-4 px-6 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <AnimatedBorder>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent px-4 py-2">
              Vision4k
            </h1>
          </AnimatedBorder>
        </div>

        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search wallpapers..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors md:hidden"
        >
          <span>Menu</span>
          <FiChevronDown
            className={`transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Menú horizontal para desktop */}
      <nav className="hidden md:block mt-4">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex space-x-1 pb-2">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <button className="px-4 py-2 bg-gray-800 hover:bg-purple-600 rounded-lg text-sm whitespace-nowrap transition-colors">
                  {category}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* Menú desplegable para mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute left-0 right-0 bg-gray-800 shadow-2xl mt-2 p-6 max-h-[70vh] overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="px-3 py-2 bg-gray-700 hover:bg-purple-600 rounded-lg text-sm text-left transition-colors"
                >
                  {category}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
