// app/ingresos/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const IngresosPage = () => {
  const [ingresos, setIngresos] = useState([
    { id: 1, description: 'Salario', amount: 2000, date: '2024-01-01' },
    { id: 2, description: 'Venta coche', amount: 5000, date: '2024-02-15' },
    { id: 3, description: 'Freelance', amount: 1200, date: '2024-03-10' },
    { id: 3, description: 'Freelance', amount: 1200, date: '2024-03-10' },
    { id: 3, description: 'Freelance', amount: 1200, date: '2024-03-10' },

  ]);

  const router = useRouter();

  const handleIngresoClick = (id: number) => {
    // Al hacer clic en un ítem, redirige al detalle del ingreso
    router.push(`/ingresos/${id}`);
  };

  return (
    <div className="relative p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Ingresos</h1>

      {/* Lista de ingresos */}
      <div className="space-y-4">
        {ingresos.map((ingreso) => (
          <div
            key={ingreso.id}
            onClick={() => handleIngresoClick(ingreso.id)}
            className="flex justify-between items-center bg-gray-100 text-black p-4 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div>
              <h2 className="text-lg font-semibold">{ingreso.description}</h2>
              <p className="text-sm text-gray-500">{ingreso.date}</p>
            </div>
            <div>
              <p className="text-lg font-bold">${ingreso.amount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de agregar ingreso */}
      <button
        onClick={() => router.push('/ingresos/add')}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 hover:scale-110 transition-transform duration-300"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default IngresosPage;
