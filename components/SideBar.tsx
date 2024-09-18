// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaTachometerAlt, FaMoneyBillWave, FaDollarSign, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md'; // Icono para cerrar
import { FiMenu } from 'react-icons/fi'; // Icono de menú desplegable

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
      <div className={`fixed top-0 left-0 h-full bg-[#1A3D6D] text-white p-5 shadow-lg transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        {/* Nombre de la aplicación */}
        <div className="mb-10 mt-16 flex justify-center">
          <h1 className="text-xl font-bold text-center">Gestión Financiera SAD</h1>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1">
          <ul className="space-y-4">
            <li className="flex items-center text-white hover:bg-[#2A9D8F] p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
              <FaTachometerAlt className="mr-3" /> 
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="flex items-center text-white hover:bg-[#2A9D8F] p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
              <FaDollarSign className="mr-3" /> 
              <Link href="/ingresos">Ingresos</Link>
            </li>
            <li className="flex items-center text-white hover:bg-[#2A9D8F] p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
              <FaMoneyBillWave className="mr-3" /> 
              <Link href="/gastos">Gastos</Link>
            </li>
            <li className="flex items-center text-white hover:bg-[#2A9D8F] p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
              <FaChartLine className="mr-3" /> 
              <Link href="/forecast">Forecast</Link>
            </li>
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="mt-auto">
          <button className="flex items-center text-white hover:bg-[#A63333] p-2 rounded-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105">
            <FaSignOutAlt className="mr-3" /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
