// app/gastos/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Simulación de datos de gasto (en un caso real, esto vendría de una API)
const mockGastos = [
  {
    id: 1,
    description: 'Compra de alimentos',
    amount: 100,
    date: '2024-01-02',
    category: 'Alimentos',
    note: 'Compras del supermercado',
  },
  {
    id: 2,
    description: 'Pago de alquiler',
    amount: 500,
    date: '2024-02-01',
    category: 'Alquiler',
    note: 'Pago mensual del alquiler del departamento',
  },
  {
    id: 3,
    description: 'Factura de electricidad',
    amount: 150,
    date: '2024-03-10',
    category: 'Servicios',
    note: 'Pago de factura mensual de electricidad',
  },
];

const GastoDetail = ({ params }: { params: { id: string } }) => {
  const [gasto, setGasto] = useState<any>(null);

  useEffect(() => {
    // Simulación de una API para obtener los detalles del gasto
    const fetchGasto = () => {
      const gastoEncontrado = mockGastos.find(
        (gasto) => gasto.id === parseInt(params.id)
      );
      setGasto(gastoEncontrado);
    };

    fetchGasto();
  }, [params.id]);

  if (!gasto) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Gasto</h1>

      <div className="space-y-6 text-black">
        {/* Descripción */}
        <div>
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p className="text-gray-700">{gasto.description}</p>
        </div>

        {/* Monto */}
        <div>
          <h2 className="text-lg font-semibold">Monto</h2>
          <p className="text-gray-700">${gasto.amount}</p>
        </div>

        {/* Fecha */}
        <div>
          <h2 className="text-lg font-semibold">Fecha del Gasto</h2>
          <p className="text-gray-700">{gasto.date}</p>
        </div>

        {/* Categoría */}
        <div>
          <h2 className="text-lg font-semibold">Categoría</h2>
          <p className="text-gray-700">{gasto.category}</p>
        </div>

        {/* Nota */}
        {gasto.note && (
          <div>
            <h2 className="text-lg font-semibold">Nota</h2>
            <p className="text-gray-700">{gasto.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GastoDetail;
