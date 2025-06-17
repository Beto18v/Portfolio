import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Necesitarás instalar react-icons

function AmbientSound({ soundFile }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(soundFile));

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, soundFile]);

  useEffect(() => {
    audioRef.current.loop = true; // Para que el sonido se repita
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        className="bg-black bg-opacity-70 text-gray-300 rounded-full shadow-md p-2 hover:bg-opacity-90 transition-colors duration-300"
        onClick={togglePlay}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}

export default AmbientSound;
