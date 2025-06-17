import React from "react";
import "./styles/Navbar.css"; // Puedes crear un archivo CSS aparte para estilos más complejos

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-gray bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="logo font-orbitron text-2xl font-bold text-neon-cyan animate-pulse">
          Eon<span className="text-electric-blue">Flow</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a
            href="#inicio"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            Servicios
          </a>
          <a
            href="#ia"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            IA
          </a>
          <a
            href="#proyectos"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            Proyectos
          </a>
          <a
            href="#nosotros"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            Nosotros
          </a>
          <a
            href="#contacto"
            className="text-cool-white hover:text-neon-cyan transition-colors duration-300"
          >
            Contacto
          </a>
        </div>
        {/* Puedes añadir un botón de menú móvil aquí */}
      </div>
    </nav>
  );
}

export default Navbar;
