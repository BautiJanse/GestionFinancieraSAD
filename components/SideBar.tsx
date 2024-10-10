// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaMoneyBillWave, FaDollarSign, FaChartLine, FaSignOutAlt, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md'; // Icono para cerrar más estilizado
import { FiMenu } from 'react-icons/fi'; // Icono de menú desplegable

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
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
            <li className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400">
              <FaTachometerAlt className="mr-3" /> 
              <Link href="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
            </li>
            <li className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400">
              <FaDollarSign className="mr-3" /> 
              <Link href="/ingresos" onClick={handleLinkClick}>Ingresos</Link>
            </li>
            <li className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400">
              <FaMoneyBillWave className="mr-3" /> 
              <Link href="/gastos" onClick={handleLinkClick}>Gastos</Link>
            </li>
            
            <li className="flex items-center text-white hover:bg-gray-700 p-3 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-yellow-400">
              <FaProjectDiagram className="mr-3" /> 
              <Link href="/inversiones" onClick={handleLinkClick}>Inversiones</Link>
            </li>
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="mt-auto">
          <button className="flex items-center text-white hover:bg-red-600 p-3 rounded-lg w-full transition-transform duration-300 ease-in-out transform hover:scale-105">
            <FaSignOutAlt className="mr-3" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
