'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Para redirigir al login
import { FaTachometerAlt, FaMoneyBillWave, FaDollarSign, FaChartLine, FaSignOutAlt, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md'; // Icono para cerrar más estilizado
import { FiMenu } from 'react-icons/fi'; // Icono de menú desplegable

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter(); // Hook para redirigir al login

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Eliminar el estado de autenticación
    router.push('/login'); // Redirigir al login
  };

  return (
    <div>
      {/* Botón para ocultar/desplegar el sidebar */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className={`${isOpen ? 'text-white' : 'text-black'} text-3xl focus:outline-none`} // Cambia el color del ícono
        >
          {isOpen ? <MdOutlineClose /> : <FiMenu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-black text-white p-6 shadow-lg z-40 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        {/* Nombre de la aplicación */}
        <div className="mb-10 mt-16 flex justify-center">
          <h1 className="text-xl font-bold text-center">Gestión Financiera SAD</h1>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1">
          <ul className="space-y-6">
            <Link className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400" href="/dashboard" onClick={handleLinkClick}>
              <FaTachometerAlt className="mr-3" /> 
              <h1>Dashboard</h1>
            </Link>
            <Link className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400" href="/ingresos" onClick={handleLinkClick}>
              <FaDollarSign className="mr-3" /> 
              <h1>Ingresos</h1>
            </Link>
            <Link className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400" href="/gastos" onClick={handleLinkClick}>
              <FaMoneyBillWave className="mr-3" /> 
              <h1>Gastos</h1>
            </Link>
            
            <Link className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400" href="/inversiones" onClick={handleLinkClick}>
              <FaProjectDiagram className="mr-3" /> 
              <h1>Inversiones</h1>
            </Link>
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="mt-auto">
          <button
            onClick={handleLogout} // Lógica de cierre de sesión
            className="flex items-center text-white hover:bg-red-600 p-3 rounded-lg w-full transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <FaSignOutAlt className="mr-3" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
