import React from "react";
import ParticleBackground from "./ParticleBackground"; // Componente para el fondo de partículas

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-dark-gray to-black opacity-70 z-10"></div>
      <div className="container mx-auto text-center px-6 z-20">
        <h1 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-bold text-neon-cyan mb-4">
          Impulsando el futuro con IA y software de vanguardia
        </h1>
        <p className="text-cool-white text-lg md:text-xl mb-8">
          EonFlow crea soluciones que transforman el mañana
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-electric-blue hover:bg-neon-cyan text-cool-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md">
            Explorar más
          </button>
          <button className="bg-plasma-purple hover:bg-neon-cyan text-cool-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md">
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
