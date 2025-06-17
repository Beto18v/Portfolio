import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-cyan-900/80"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-radial-gradient"></div>

      <div className="relative z-10 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent"
        >
          Vision4k
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Discover and download free stunning 4K wallpapers for all your devices
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg font-medium hover:scale-105 transition-transform shadow-lg text-white">
            Explore Collections
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
