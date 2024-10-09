// app/inversiones/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

// Datos simulados para el proyecto
const mockProyectos = [
  {
    id: 1,
    nombre: 'Ampliación de Estadio',
    descripcion: 'Proyecto para ampliar la capacidad del estadio.',
    costoTotal: 500000,
    duracion: 24,
    fechaInicio: '2024-01-01',
    fuentesFinanciacion: [
      { tipo: 'Préstamo', monto: 300000, tasaInteres: 5, plazo: 24 },
      { tipo: 'Fondos Propios', monto: 200000 },
    ],
    ingresosProyectados: [
      { anio: 2024, monto: 150000 },
      { anio: 2025, monto: 250000 },
      { anio: 2026, monto: 300000 },
    ],
  },
];

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  costoTotal: number;
  duracion: number;
  fechaInicio: string;
  fuentesFinanciacion: { tipo: string; monto: number; tasaInteres?: number; plazo?: number }[];
  ingresosProyectados: { anio: number; monto: number }[];
}

const ProyectoDetail = ({ params }: { params: { id: string } }) => {
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Obtener los detalles del proyecto
    const fetchProyecto = () => {
      const proyectoEncontrado = mockProyectos.find(
        (proyecto) => proyecto.id === parseInt(params.id)
      );

      // Verificar si proyectoEncontrado existe antes de asignarlo
      if (proyectoEncontrado) {
        setProyecto(proyectoEncontrado);
      } else {
        setProyecto(null); // Asignar null si no se encuentra el proyecto
      }
    };

    fetchProyecto();
  }, [params.id]);

  if (!proyecto) {
    return <div className="p-6">Cargando...</div>;
  }

  // Calcular resultados financieros
  const totalIngresos = proyecto.ingresosProyectados.reduce(
    (total, ingreso) => total + ingreso.monto,
    0
  );
  const roi = ((totalIngresos - proyecto.costoTotal) / proyecto.costoTotal) * 100;
  let acumulado = 0;
  let payback = 'No recuperado';
  for (let i = 0; i < proyecto.ingresosProyectados.length; i++) {
    acumulado += proyecto.ingresosProyectados[i].monto;
    if (acumulado >= proyecto.costoTotal) {
      payback = proyecto.ingresosProyectados[i].anio.toString();
      break;
    }
  }

  const handleEditProyecto = () => {
    router.push(`/inversiones/edit/${proyecto.id}`);
  };

  const handleDeleteProyecto = () => {
    console.log('Proyecto eliminado:', proyecto.id);
    router.push('/inversiones');
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-black">{proyecto.nombre}</h1>
        <div className="space-x-4">
          <button
            onClick={handleEditProyecto}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaEdit className="inline mr-2" />
            Modificar
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <FaTrash className="inline mr-2" />
            Eliminar
          </button>
        </div>
      </div>

      {/* Detalles del Proyecto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información Básica */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Información del Proyecto</h2>
          <p><span className="font-semibold">Descripción:</span> {proyecto.descripcion}</p>
          <p><span className="font-semibold">Costo Total:</span> ${proyecto.costoTotal.toLocaleString()}</p>
          <p><span className="font-semibold">Duración:</span> {proyecto.duracion} meses</p>
          <p><span className="font-semibold">Fecha de Inicio:</span> {proyecto.fechaInicio}</p>
        </div>

        {/* Fuentes de Financiación */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Fuentes de Financiación</h2>
          {proyecto.fuentesFinanciacion.map((fuente, index) => (
            <p key={index}>
              {fuente.tipo}: ${fuente.monto.toLocaleString()} {fuente.tasaInteres ? `(Tasa de interés: ${fuente.tasaInteres}%)` : ''}
            </p>
          ))}
        </div>

        {/* Ingresos Proyectados */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Ingresos Proyectados</h2>
          {proyecto.ingresosProyectados.map((ingreso, index) => (
            <p key={index}>
              Año {ingreso.anio}: ${ingreso.monto.toLocaleString()}
            </p>
          ))}
        </div>

        {/* Análisis Financiero */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Análisis Financiero</h2>
          <p><span className="font-semibold">Total de Ingresos:</span> ${totalIngresos.toLocaleString()}</p>
          <p><span className="font-semibold">ROI:</span> {roi.toFixed(2)}%</p>
          <p><span className="font-semibold">Período de Recuperación (Payback):</span> {payback}</p>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-6">¿Estás seguro de que deseas eliminar este proyecto?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteProyecto}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaCheck className="inline mr-2" />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProyectoDetail;
