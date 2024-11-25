'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FaCheck, FaArrowLeft } from 'react-icons/fa'; // Iconos para los botones

interface Gasto {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string; // Añadir el campo type
  paymentMethod: string; // Añadir el campo paymentMethod
  note: string; // Este campo puede ser opcional
}

interface Params {
  id: string;
}

const AddGasto = () => {
  
  const router = useRouter();
  const params = useParams(); // Obtener el ID de la URL
  const [gasto, setGasto] = useState<Gasto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Log para asegurarnos de que el id sea correcto
    console.log('Fetching gasto with ID:', params.id);
    const fetchGasto = async () => {
      try {
        const response = await fetch(`https://back-finanzas.onrender.com/api/gastos/${params.id}`);

        if (!response.ok) {
          console.error('API request failed:', response.statusText);
          throw new Error('Error al obtener los detalles del ingreso');
        }

        const data = await response.json();
        
        setGasto(data); // Guardar los detalles del ingreso
        
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

    
    fetchGasto();
  }, [params.id]);

  
  if (loading) {
    return <div className="p-8">Cargando detalles del ingreso...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!gasto) {
    return <div className="p-8">Ingreso no encontrado.</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Gasto</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
      <h1 className='text-2xl font-bold mb-4'><strong>{gasto.description}</strong></h1>
        <p className="mb-3"><strong>Monto:</strong> ${gasto.amount}</p>
        <p className="mb-3"><strong>Fecha:</strong>  {new Date(gasto.date).toLocaleDateString('es-AR')}</p>
        <p className="mb-3"><strong>Categoría:</strong> {gasto.category}</p>
        <p className="mb-3"><strong>Tipo:</strong> {gasto.type}</p>
        <p className="mb-3"><strong>Método de Pago:</strong> {gasto.paymentMethod}</p>
        {gasto.note && <p className="mb-3"><strong>Nota:</strong> {gasto.note}</p>}
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

export default AddGasto;