'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  costo_total: number;
  duracion: number;
}

const InversionesPage = () => {
  const router = useRouter();

  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch para obtener los proyectos de inversión desde la API
  const fetchProyectos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/proyectos/');
      if (!response.ok) {
        throw new Error('Error al obtener los proyectos de inversión');
      }
      const data = await response.json();
      setProyectos(data); // Suponiendo que el API devuelve un array de proyectos
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  const handleProyectoClick = (id: number) => {
    router.push(`/inversiones/${id}`);
  };

  if (loading) {
    return <div className="p-8">Cargando proyectos...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

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
              <p className="text-sm text-gray-500 mt-2">{proyecto.descripcion}</p>
              <p className="text-sm text-gray-500">Duración: {proyecto.duracion} meses</p>
            </div>
            <div className="mt-4 lg:mt-0 lg:text-right">
              <p className="text-lg font-bold text-green-600">Inversión Total: ${proyecto.costo_total.toLocaleString()}</p>
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
