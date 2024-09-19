// app/ingresos/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaPlus, FaChevronRight } from 'react-icons/fa';

const IngresosPage = () => {
  // Lista de ingresos simulada para el ejemplo.
  const [ingresos] = useState([
    { id: 1, title: 'Salario Mensual', amount: 1500, date: '01-09-2023' },
    { id: 2, title: 'Venta de automóvil', amount: 6000, date: '15-09-2023' },
    { id: 3, title: 'Alquiler de propiedad', amount: 800, date: '22-09-2023' },
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Ingresos</h1>

      {/* Botón de agregar ingreso */}
      <div className="flex justify-end mb-6">
        <Link href="/ingresos/nuevo">
          <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300">
            <FaPlus />
            <span>Agregar Ingreso</span>
          </button>
        </Link>
      </div>

      {/* Listado de ingresos */}
      <div className="bg-gray-100 rounded-lg p-4 shadow-md">
        {ingresos.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {ingresos.map((ingreso) => (
              <li key={ingreso.id} className="flex justify-between items-center py-4 px-4 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                <div>
                  <h2 className="text-lg font-semibold text-black">{ingreso.title}</h2>
                  <p className="text-gray-600">${ingreso.amount} - {ingreso.date}</p>
                </div>
                <Link href={`/ingresos/${ingreso.id}`}>
                  <button className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-300">
                    Ver Detalle <FaChevronRight className="ml-2" />
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay ingresos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default IngresosPage;
