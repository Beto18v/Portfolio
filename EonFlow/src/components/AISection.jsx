import React, { useState } from "react";

function IASection() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = "http://localhost:8000"; // URL de tu backend

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleAskAI = async () => {
    setIsLoading(true);
    setAIResponse("");

    try {
      const response = await fetch(`${backendUrl}/ask-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail || "Error al comunicarse con el backend de IA."
        );
      }

      const data = await response.json();
      setAIResponse(data.response);
    } catch (error) {
      setAIResponse(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ia" className="py-16 bg-black bg-opacity-90">
      <div className="container mx-auto px-6">
        <h2 className="font-orbitron text-3xl font-bold text-neon-cyan mb-8 text-center">
          Interactúa con nuestra IA
        </h2>
        <div className="mb-8">
          <label htmlFor="ai-input" className="block text-cool-white mb-2">
            Ingresa tu pregunta:
          </label>
          <input
            type="text"
            id="ai-input"
            className="bg-dark-gray border border-neon-cyan text-cool-white rounded-md py-2 px-3 w-full focus:ring-2 focus:ring-electric-blue focus:outline-none"
            value={userInput}
            onChange={handleInputChange}
          />
          <button
            onClick={handleAskAI}
            className="bg-electric-blue hover:bg-neon-cyan text-cool-white font-bold py-3 px-6 rounded-full transition-colors duration-300 shadow-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Preguntar a la IA"}
          </button>
        </div>
        {aiResponse && (
          <div className="mt-8 p-4 bg-black rounded-md border border-gray-700">
            <h3 className="text-xl font-semibold text-neon-cyan mb-2">
              Respuesta de la IA:
            </h3>
            <p className="text-cool-white">{aiResponse}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default IASection;
