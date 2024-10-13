'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const IngresoDetail = () => {
  const router = useRouter();
  const params = useParams(); // Obtener el ID de la URL
  const [ingreso, setIngreso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para obtener los detalles del ingreso por ID desde la API
  useEffect(() => {
    const fetchIngreso = async () => {
      try {
        const response = await fetch(`https://back-finanzas.onrender.com/api/ingresos/${params.id}`);

        if (!response.ok) {
          throw new Error('Error al obtener los detalles del ingreso');
        }

        const data = await response.json();
        setIngreso(data); // Guardar los detalles del ingreso
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngreso();
  }, [params.id]);

  if (loading) {
    return <div className="p-8">Cargando detalles del ingreso...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Ingreso</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Descripción:</strong> {ingreso.description}</p>
        <p><strong>Monto:</strong> ${ingreso.amount}</p>
        <p><strong>Fecha:</strong> {ingreso.fecha}</p>
        <p><strong>Categoría:</strong> {ingreso.category}</p>
        <p><strong>Método de Pago:</strong> {ingreso.metodo_pago}</p>
        <p><strong>Nota:</strong> {ingreso.nota}</p>
        <p><strong>Tipo de Ingreso:</strong> {ingreso.tipo_ingreso}</p>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-4 bg-black text-white p-3 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300"
      >
        Volver
      </button>
    </div>
  );
};

export default IngresoDetail;
