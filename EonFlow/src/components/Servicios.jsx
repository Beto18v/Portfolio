import React from "react";
import {
  AiOutlineCode,
  AiOutlineRobot,
  AiOutlineSliders,
  AiOutlineDesktop,
} from "react-icons/ai"; // Ejemplo de íconos

const servicios = [
  {
    title: "Desarrollo de Software Personalizado",
    description:
      "Creamos software a medida con las últimas tecnologías para resolver tus desafíos únicos.",
    icon: <AiOutlineCode className="text-4xl text-neon-cyan mb-2" />,
  },
  {
    title: "Integración de Inteligencia Artificial",
    description:
      "Incorporamos soluciones de IA para optimizar tus procesos y ofrecer nuevas capacidades.",
    icon: <AiOutlineRobot className="text-4xl text-neon-cyan mb-2" />,
  },
  {
    title: "Automatización Inteligente",
    description:
      "Automatizamos tareas repetitivas con sistemas inteligentes, liberando tu tiempo y recursos.",
    icon: <AiOutlineSliders className="text-4xl text-neon-cyan mb-2" />,
  },
  {
    title: "Diseño de Interfaces Futuristas",
    description:
      "Diseñamos interfaces de usuario innovadoras y atractivas con un estilo sci-fi moderno.",
    icon: <AiOutlineDesktop className="text-4xl text-neon-cyan mb-2" />,
  },
];

function Servicios() {
  return (
    <section id="servicios" className="py-16 bg-dark-gray">
      <div className="container mx-auto text-center">
        <h2 className="font-orbitron text-3xl font-bold text-neon-cyan mb-8">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className="bg-black rounded-lg p-6 hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg border border-gray-700 hover:border-neon-cyan"
            >
              <div className="flex justify-center mb-4">{servicio.icon}</div>
              <h3 className="text-xl font-semibold text-cool-white mb-2">
                {servicio.title}
              </h3>
              <p className="text-gray-400">{servicio.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
