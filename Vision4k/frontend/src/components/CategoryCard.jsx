import { motion } from "framer-motion";
import AnimatedBorder from "./AnimatedBorder";

const CategoryCard = ({ title, items }) => {
  return (
    <motion.div whileHover={{ y: -5 }} className="mb-8 hover-glow">
      <AnimatedBorder>
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 bg-gray-700/50 rounded-full text-sm hover:bg-gradient-to-r from-purple-500 to-cyan-400 hover:text-white transition-all cursor-pointer border border-gray-600"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </AnimatedBorder>
    </motion.div>
  );
};

export default CategoryCard;
