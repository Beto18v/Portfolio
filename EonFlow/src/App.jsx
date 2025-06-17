import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/Servicios";
import AISection from "./components/AISection";
import Proyectos from "./components/Proyectos";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import AIBot from "./components/AIBot";
import AmbientSound from "./components/AmbientSound";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Servicios />
      <AISection />
      <Proyectos />
      <Nosotros />
      <Contacto />
      <Footer />
      <AIBot />
      <AmbientSound soundFile={" "} /> {/* Añade el sonido ambiente */}
    </div>
  );
}

export default App;
