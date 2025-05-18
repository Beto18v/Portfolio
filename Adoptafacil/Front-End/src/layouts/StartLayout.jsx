import DarkModeToggle from '../components/DarkModeToggle';
import Footer from 'd:/Documentos/Sena/react-adoptafacil/Front-End/src/pages/inicio/Footer.jsx';
import Header from 'd:/Documentos/Sena/react-adoptafacil/Front-End/src/pages/inicio/Header.jsx';
import { Outlet } from 'react-router-dom';

const StartLayout = () => {
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <DarkModeToggle />
        <Header />
        <Outlet />
        <Footer />
      </div>
  );
};

export default StartLayout;