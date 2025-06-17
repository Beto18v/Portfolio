import React, { useState } from "react";
import { FaEnvelope, FaWhatsapp, FaLinkedin } from "react-icons/fa"; // Ejemplo de íconos

function Contacto() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos del formulario
    console.log({ name, email, message });
    alert("Mensaje enviado");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section id="contacto" className="py-16 bg-black relative">
      {/* Mapa oscuro custom (puedes usar un iframe con estilos) */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-70">
        {/* Placeholder para el mapa */}
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
          Mapa con estilo futurista aquí (puedes usar Google Maps con estilos
          personalizados)
        </div>
      </div>
      <div className="container mx-auto px-6 z-10 relative">
        <h2 className="font-orbitron text-3xl font-bold text-neon-cyan mb-8 text-center">
          Contáctanos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-lg bg-dark-gray shadow-md border border-gray-700 hover:border-electric-blue transition-colors duration-300">
            <h3 className="text-xl font-semibold text-cool-white mb-4">
              Envíanos un mensaje
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  className="bg-black border border-neon-cyan text-cool-white rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-electric-blue focus:outline-none"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  className="bg-black border border-neon-cyan text-cool-white rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-electric-blue focus:outline-none"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  id="message"
                  rows="4"
                  className="bg-black border border-neon-cyan text-cool-white rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-electric-blue focus:outline-none"
                  placeholder="Tu mensaje"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-electric-blue hover:bg-neon-cyan text-cool-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md w-full"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
          <div className="p-6 rounded-lg bg-dark-gray shadow-md border border-gray-700 hover:border-plasma-purple transition-colors duration-300">
            <h3 className="text-xl font-semibold text-cool-white mb-4">
              Información de Contacto
            </h3>
            <p className="text-gray-400 mb-2">
              <FaEnvelope className="inline-block mr-2 text-electric-blue" />
              Email: contacto@eonflow.com
            </p>
            <p className="text-gray-400 mb-2">
              <FaWhatsapp className="inline-block mr-2 text-green-500" />
              WhatsApp: +57 300 000 0000
            </p>
            <p className="text-gray-400 mb-2">
              <FaLinkedin className="inline-block mr-2 text-blue-500" />
              LinkedIn: /company/eonflow
            </p>
            {/* Otros datos de contacto */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
