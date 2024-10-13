'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const IngresoDetail = () => {
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID de la URL
  const [ingreso, setIngreso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de los datos del ingreso por ID
  useEffect(() => {
    if (!id) {
      setError('No se encontró el ID del ingreso');
      setLoading(false);
      return;
    }

    const fetchIngreso = async () => {
      try {
        const response = await fetch(`https://back-finanzas.onrender.com/api/ingresos/${id}`);  // Cambia a tu URL del backend
        if (!response.ok) {
          throw new Error('Error al obtener el ingreso');
        }
        const data = await response.json();
        setIngreso(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngreso();
  }, [id]);

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!ingreso) {
    return <div className="p-8 text-red-500">No se encontró el ingreso.</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Ingreso</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <p><strong>Descripción:</strong> {ingreso.description}</p> {/* description */}
        <p><strong>Monto:</strong> ${ingreso.amount}</p> {/* amount */}
        <p><strong>Fecha del Ingreso:</strong> {new Date(ingreso.date).toLocaleDateString()}</p> {/* date */}
        <p><strong>Categoría:</strong> {ingreso.category}</p> {/* category */}
        <p><strong>Método de Pago:</strong> {ingreso.paymentMethod || 'N/A'}</p> {/* paymentMethod */}
        <p><strong>Nota:</strong> {ingreso.note || 'Sin notas'}</p> {/* note */}
        <p><strong>Tipo de Ingreso:</strong> {ingreso.tipo_ingreso || 'N/A'}</p> {/* tipo_ingreso */}
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
