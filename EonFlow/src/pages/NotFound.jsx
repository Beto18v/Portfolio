import React from "react";
import { Link } from "react-router-dom"; // Necesitarás instalar react-router-dom si no lo tienes

function NotFound() {
  return (
    <div className="min-h-screen bg-dark-gray flex flex-col justify-center items-center text-cool-white font-orbitron">
      <h1 className="text-6xl text-plasma-purple glowing">404</h1>
      <p className="text-2xl mt-4 text-neon-cyan">Error de Sistema</p>
      <p className="mt-2 text-gray-400">
        La página que buscas no se ha encontrado.
      </p>
      <Link
        to="/"
        className="mt-6 bg-electric-blue hover:bg-neon-cyan text-cool-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}

export default NotFound;
