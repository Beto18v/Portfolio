import React, { useState } from "react";

function AIBot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-gradient-to-br from-electric-blue to-neon-cyan text-cool-white font-bold rounded-full shadow-lg p-3 hover:scale-105 transition-transform duration-300"
        onClick={toggleBot}
      >
        {isOpen ? "X" : "🤖"} {/* Puedes usar un icono más elaborado */}
      </button>
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 w-64 bg-dark-gray rounded-md shadow-md p-4 border border-neon-cyan">
          <p className="text-sm text-gray-300">Asistente EonFlow</p>
          <div className="mt-2">
            {/* Aquí podrías añadir funcionalidades más complejas */}
            <p className="text-cool-white text-xs italic">
              ¿Cómo puedo ayudarte hoy?
            </p>
            {/* ... más interacciones ... */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIBot;
