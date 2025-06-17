import { motion } from "framer-motion";

const AnimatedBorder = ({ children, className = "", size = "md" }) => {
  const paddingClasses = {
    sm: "p-[1px]",
    md: "p-[2px]",
    lg: "p-[3px]",
  };

  return (
    <div className={`relative ${paddingClasses[size]} rounded-lg ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background:
            "conic-gradient(from var(--angle), #7c3aed, #00f0ff, #7c3aed)",
          border: "2px solid transparent",
        }}
        animate={{
          "--angle": ["0deg", "360deg"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-gray-900 rounded-[calc(0.5rem-2px)] z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorder;
