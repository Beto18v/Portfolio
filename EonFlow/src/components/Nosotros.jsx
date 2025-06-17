import React from "react";

const teamMembers = [
  {
    name: "Dr. IA Visionario",
    role: "CEO",
    image: "https://via.placeholder.com/150/9932CC/FFFFFF?Text=CEO",
  },
  {
    name: "Sofía Código",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150/007bff/FFFFFF?Text=LD",
  },
  {
    name: "Arturo Interfaz",
    role: "UI/UX Designer",
    image: "https://via.placeholder.com/150/00FFFF/000000?Text=UID",
  },
];

function Nosotros() {
  return (
    <section
      id="nosotros"
      className="py-16 bg-black bg-opacity-90 relative overflow-hidden"
    >
      {/* Fondo tipo galaxia (puedes usar un SVG o CSS) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900 to-gray-900 opacity-50 z-0"></div>
      <div className="container mx-auto px-6 z-10 relative">
        <h2 className="font-orbitron text-3xl font-bold text-neon-cyan mb-8 text-center">
          Nosotros
        </h2>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-cool-white mb-4 text-center">
            Nuestra Misión
          </h3>
          <p className="text-cool-white text-lg text-center">
            Impulsar la innovación a través de la inteligencia artificial y el
            desarrollo de software de vanguardia, creando soluciones que
            anticipen el futuro y generen un impacto positivo en la sociedad.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-cool-white mb-4 text-center">
            Nuestra Visión
          </h3>
          <p className="text-cool-white text-lg text-center">
            Ser líderes en la transformación digital, reconocidos por nuestra
            capacidad para desarrollar soluciones tecnológicas disruptivas que
            definan los estándares del mañana.
          </p>
        </div>
        <div className="my-12">
          <h3 className="text-2xl font-semibold text-neon-cyan mb-4 text-center">
            Nuestros Valores
          </h3>
          <div className="flex justify-around flex-wrap gap-4">
            <span className="bg-dark-gray text-cool-white rounded-full px-4 py-2 text-sm">
              Innovación
            </span>
            <span className="bg-dark-gray text-cool-white rounded-full px-4 py-2 text-sm">
              Ética
            </span>
            <span className="bg-dark-gray text-cool-white rounded-full px-4 py-2 text-sm">
              Futuro
            </span>
            <span className="bg-dark-gray text-cool-white rounded-full px-4 py-2 text-sm">
              Comunidad
            </span>
          </div>
        </div>
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-electric-blue mb-4 text-center">
            Nuestro Equipo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-dark-gray rounded-lg shadow-md p-4 text-center border border-gray-700 hover:border-plasma-purple transition-colors duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full w-32 h-32 mx-auto mb-2 object-cover"
                />
                <h4 className="text-cool-white font-semibold">{member.name}</h4>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Nosotros;
