// app/inversiones/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

interface IngresoProyectado {
  anio: number;
  monto: number;
}

const AddProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  const [duracion, setDuracion] = useState('');
  const [fuentesFinanciacion, setFuentesFinanciacion] = useState('');
  const [ingresosProyectados, setIngresosProyectados] = useState<IngresoProyectado[]>([{ anio: 0, monto: 0 }]);

  const router = useRouter();

  // Lógica de agregar un proyecto
  const handleAddProyecto = () => {
    // Aquí agregarías la lógica de agregar el proyecto
    console.log('Nuevo proyecto:', { nombre, descripcion, costoTotal, duracion, fuentesFinanciacion, ingresosProyectados });
    router.push('/inversiones');
  };

  // Manejo del cambio en los ingresos proyectados
  const handleIngresoChange = (index: number, field: keyof IngresoProyectado, value: number) => {
    const newIngresos = [...ingresosProyectados];
    newIngresos[index][field] = value;
    setIngresosProyectados(newIngresos);
  };

  const addIngresoProyectado = () => {
    setIngresosProyectados([...ingresosProyectados, { anio: 0, monto: 0 }]);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Agregar Nuevo Proyecto</h1>

      {/* Formulario de Proyecto */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-black font-bold mb-2">Nombre del Proyecto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
            placeholder="Nombre del proyecto"
          />
        </div>

        {/* Ingresos Proyectados */}
        <div className="relative lg:col-span-2">
          <label className="block text-black font-bold mb-2">Ingresos Proyectados</label>
          {ingresosProyectados.map((ingreso, index) => (
            <div key={index} className="flex space-x-4 mb-2">
              <input
                type="number"
                placeholder="Año"
                value={ingreso.anio}
                onChange={(e) => handleIngresoChange(index, 'anio', parseInt(e.target.value))}
                className="w-1/3 p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
              />
              <input
                type="number"
                placeholder="Monto"
                value={ingreso.monto}
                onChange={(e) => handleIngresoChange(index, 'monto', parseFloat(e.target.value))}
                className="w-2/3 p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addIngresoProyectado}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Añadir Ingreso Proyectado
          </button>
        </div>
      </form>

      <button
        onClick={handleAddProyecto}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaCheck className="mr-2" />
        Crear Proyecto
      </button>
    </div>
  );
};

export default AddProyecto;
