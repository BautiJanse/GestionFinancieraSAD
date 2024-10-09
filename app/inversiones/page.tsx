// app/inversiones/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

const InversionesPage = () => {
  const router = useRouter();

  // Simulación de datos de proyectos
  const [proyectos] = useState([
    { id: 1, nombre: 'Ampliación de Estadio', costoTotal: 500000, fechaInicio: '2024-01-01', duracion: 24 },
    { id: 2, nombre: 'Construcción de Gimnasio', costoTotal: 200000, fechaInicio: '2024-06-01', duracion: 12 },
  ]);

  const handleProyectoClick = (id: number) => {
    router.push(`/inversiones/${id}`);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Proyectos de Inversión</h1>

      {/* Lista de proyectos */}
      <div className="space-y-4">
        {proyectos.map((proyecto) => (
          <div
            key={proyecto.id}
            onClick={() => handleProyectoClick(proyecto.id)}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-gray-100 text-black p-6 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div>
              <h2 className="text-2xl font-semibold">{proyecto.nombre}</h2>
              <p className="text-sm text-gray-500 mt-2">Fecha de inicio: {proyecto.fechaInicio}</p>
              <p className="text-sm text-gray-500">Duración: {proyecto.duracion} meses</p>
            </div>
            <div className="mt-4 lg:mt-0 lg:text-right">
              <p className="text-lg font-bold text-green-600">Inversión Total: ${proyecto.costoTotal.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de agregar proyecto */}
      <button
        onClick={() => router.push('/inversiones/add')}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default InversionesPage;
