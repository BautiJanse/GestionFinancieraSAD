// app/ingresos/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Simulación de datos de ingreso (en un caso real, esto vendría de una API)
const mockIngresos = [
  {
    id: 1,
    description: 'Salario',
    amount: 2000,
    date: '2024-01-01',
    category: 'Salario',
    paymentMethod: 'Transferencia Bancaria',
    note: 'Salario mensual de enero',
  },
  {
    id: 2,
    description: 'Venta de coche',
    amount: 5000,
    date: '2024-02-15',
    category: 'Venta',
    paymentMethod: 'Efectivo',
    note: 'Venta de coche usado',
  },
  // Puedes agregar más datos de prueba aquí
];

const IngresoDetail = ({ params }: { params: { id: string } }) => {
  const [ingreso, setIngreso] = useState<any>(null);

  useEffect(() => {
    // Simulación de una API para obtener los detalles del ingreso
    const fetchIngreso = () => {
      const ingresoEncontrado = mockIngresos.find(
        (ingreso) => ingreso.id === parseInt(params.id)
      );
      setIngreso(ingresoEncontrado);
    };

    fetchIngreso();
  }, [params.id]);

  if (!ingreso) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Ingreso</h1>

      <div className="space-y-6 text-black">
        {/* Descripción */}
        <div>
          <h2 className="text-lg font-semibold">Descripción</h2>
          <p className="text-gray-700">{ingreso.description}</p>
        </div>

        {/* Monto */}
        <div>
          <h2 className="text-lg font-semibold">Monto</h2>
          <p className="text-gray-700">${ingreso.amount}</p>
        </div>

        {/* Fecha */}
        <div>
          <h2 className="text-lg font-semibold">Fecha del Ingreso</h2>
          <p className="text-gray-700">{ingreso.date}</p>
        </div>

        {/* Categoría */}
        <div>
          <h2 className="text-lg font-semibold">Categoría</h2>
          <p className="text-gray-700">{ingreso.category}</p>
        </div>

        {/* Método de pago */}
        <div>
          <h2 className="text-lg font-semibold">Método de Pago</h2>
          <p className="text-gray-700">{ingreso.paymentMethod}</p>
        </div>

        {/* Nota */}
        {ingreso.note && (
          <div>
            <h2 className="text-lg font-semibold">Nota</h2>
            <p className="text-gray-700">{ingreso.note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresoDetail;
