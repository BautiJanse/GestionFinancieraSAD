'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaArrowLeft } from 'react-icons/fa'; // Icono para el botón

// Definir la interfaz del Proyecto
interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  costo_total: number;
  duracion: number;
  ingresos_proyectados: number;
  roi: number;
  payback: string;
  total_ingresos: number;
}


const ProyectoDetail = () => {
  const router = useRouter();
  const params = useParams(); // Obtener el ID de la URL
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) {
      setError('El ID del proyecto no es válido.');
      return;
    }
  
    const fetchProyecto = async () => {
      try {
        const response = await fetch(`https://back-finanzas.onrender.com/api/proyectos/${params.id}`);
  
        if (!response.ok) {
          console.error('API request failed:', response.statusText);
          throw new Error('Error al obtener los detalles del proyecto');
        }
  
        const data = await response.json();
        setProyecto(data); // Guardar los detalles del proyecto
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
  
    fetchProyecto();
  }, [params.id]);
  

  if (loading) {
    return <div className="p-8">Cargando detalles del proyecto...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!proyecto) {
    return <div className="p-8">Proyecto no encontrado.</div>;
  }

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Detalle del Proyecto</h1>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-3">{proyecto.nombre}</h1>
        <p className="mb-3"><strong>Descripción:</strong> {proyecto.descripcion}</p>
        <p className="mb-3"><strong>Costo Total:</strong> ${proyecto.costo_total}</p>
        <p className="mb-3"><strong>Duración:</strong> {proyecto.duracion} meses</p>

        {/* Iterar sobre ingresos_proyectados */}
          <p className="mb-3"><strong>Ingresos Proyectados:</strong></p>
          {Array.isArray(proyecto.ingresos_proyectados) && proyecto.ingresos_proyectados.length > 0 ? (
          proyecto.ingresos_proyectados.map((ingreso, index) => (
          <div key={index}>
          <p className="mb-3 pl-5"><strong>- Año {ingreso.anio}:</strong> ${parseFloat(ingreso.monto).toFixed(2)}</p>

    </div>
  ))
) : (
  <p>No hay ingresos proyectados</p>
)}


  <p className="mb-3"><strong>ROI:</strong> {proyecto.roi}%</p>
  <p className="mb-3"><strong>Payback:</strong> {proyecto.payback}</p>
  <p className="mb-3"><strong>Ingresos totales:</strong> {proyecto.total_ingresos}</p>

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

export default ProyectoDetail;
