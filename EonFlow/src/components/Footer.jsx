import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Ejemplo de íconos

function Footer() {
  return (
    <footer className="bg-dark-gray py-6 text-center text-cool-white">
      <div className="container mx-auto">
        <div className="flex justify-center items-center mb-2">
          <div className="logo font-orbitron text-xl font-bold text-neon-cyan mr-4 animate-pulse">
            Eon<span className="text-electric-blue">Flow</span>
          </div>
          <div className="flex space-x-4">
            <a
              href="#inicio"
              className="hover:text-neon-cyan transition-colors duration-300"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              className="hover:text-neon-cyan transition-colors duration-300"
            >
              Servicios
            </a>
            <a
              href="#ia"
              className="hover:text-neon-cyan transition-colors duration-300"
            >
              IA
            </a>
            {/* Otros enlaces rápidos */}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="#"
            className="hover:text-electric-blue transition-colors duration-300"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            href="#"
            className="hover:text-neon-cyan transition-colors duration-300"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href="#"
            className="hover:text-plasma-purple transition-colors duration-300"
          >
            <FaInstagram className="text-xl" />
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          © {new Date().getFullYear()} EonFlow. Todos los derechos reservados.
        </p>
        <p className="mt-2 text-sm text-neon-cyan font-bold">
          Diseñando hoy lo que mañana será estándar
        </p>
      </div>
    </footer>
  );
}

export default Footer;
