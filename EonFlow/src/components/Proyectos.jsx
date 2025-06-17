import React from "react";

const proyectos = [
  {
    title: "Plataforma de Análisis Predictivo IA",
    description:
      "Desarrollo de una plataforma para predecir tendencias del mercado utilizando machine learning.",
    tech: ["Python", "TensorFlow", "React"],
    image: "https://via.placeholder.com/600/007bff/FFFFFF?Text=Proyecto%201", // Reemplaza con tus imágenes
    link: "#",
  },
  {
    title: "Sistema de Automatización Inteligente para Logística",
    description:
      "Implementación de un sistema para optimizar rutas y gestión de inventario con IA.",
    tech: ["Node.js", "AWS AI", "Angular"],
    image: "https://via.placeholder.com/600/9932CC/FFFFFF?Text=Proyecto%202",
    link: "#",
  },
  {
    title: "Interfaz de Usuario Futurista para Vehículos Autónomos",
    description:
      "Diseño y desarrollo de una interfaz inmersiva para la nueva generación de vehículos autónomos.",
    tech: ["Figma", "Three.js", "React Native"],
    image: "https://via.placeholder.com/600/00FFFF/000000?Text=Proyecto%203",
    link: "#",
  },
];

function Proyectos() {
  return (
    <section id="proyectos" className="py-16 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="font-orbitron text-3xl font-bold text-neon-cyan mb-8">
          Proyectos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {proyectos.map((proyecto, index) => (
            <div
              key={index}
              className="bg-dark-gray rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700 hover:border-electric-blue"
            >
              <img
                src={proyecto.image}
                alt={proyecto.title}
                className="rounded-t-lg w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-cool-white mb-2">
                  {proyecto.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {proyecto.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {proyecto.tech.map((tec, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-neon-cyan text-xs rounded-full px-2 py-1"
                    >
                      {tec}
                    </span>
                  ))}
                </div>
                <a
                  href={proyecto.link}
                  className="text-electric-blue hover:text-neon-cyan transition-colors duration-300 font-semibold"
                >
                  Ver Proyecto
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Proyectos;
