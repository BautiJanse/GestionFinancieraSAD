'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa'; // Icono para el botón


interface Ingreso {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  paymentMethod: string;
  note: string;
  tipo_ingreso: string;
}

const IngresoDetail = () => {
  const router = useRouter();
  const params = useParams(); // Obtener el ID de la URL
  const [ingreso, setIngreso] = useState<Ingreso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log para asegurarnos de que el id sea correcto
    console.log('Fetching ingreso with ID:', params.id);
    const fetchIngreso = async () => {
      try {
        const response = await fetch(`https://back-finanzas.onrender.com/api/ingresos/${params.id}`);

        if (!response.ok) {
          console.error('API request failed:', response.statusText);
          throw new Error('Error al obtener los detalles del ingreso');
        }

        const data = await response.json();
        setIngreso(data); // Guardar los detalles del ingreso
        console.log(data.note)
        console.log(data)
        console.log(data.category)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Fetch error:', error);
          setError(error.message);
        } else {
          setError('Error desconocido');
        }
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

  if (!ingreso) {
    return <div className="p-8">Ingreso no encontrado.</div>;
  }

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Ingreso</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-3"> {ingreso.description}</h1>
      <p className="mb-3"><strong>Monto:</strong> ${ingreso.amount}</p>
      <p className="mb-3"><strong>Fecha:</strong> {new Date(ingreso.date).toLocaleDateString('es-AR')}</p>
      <p className="mb-3"><strong>Categoría:</strong> {ingreso.category}</p>
      <p className="mb-3"><strong>Método de Pago:</strong> {ingreso.paymentMethod}</p>
      <p className="mb-3"><strong>Nota:</strong> {ingreso.note || 'No hay nota disponible'}</p>
      <p className="mb-3"><strong>Tipo de Ingreso:</strong> {ingreso.tipo_ingreso}</p>

      </div>

      <button
        onClick={() => router.back()}
        className="mt-5 bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </button>
    </div>
  );
};

export default IngresoDetail;
