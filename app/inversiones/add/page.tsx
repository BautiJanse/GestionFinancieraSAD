'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaPlus, FaTrash, FaArrowLeft } from 'react-icons/fa';

interface IngresoProyectado {
  anio: number;
  monto: number;
}

const AddProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  const [duracion, setDuracion] = useState('');
  const [ingresosProyectados, setIngresosProyectados] = useState<IngresoProyectado[]>([{ anio: 0, monto: 0 }]);

  const [roi, setRoi] = useState(0);
  const [payback, setPayback] = useState('');
  const [totalIngresos, setTotalIngresos] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const totalIngresosCalculados = ingresosProyectados.reduce(
      (total, ingreso) => total + ingreso.monto,
      0
    );
    setTotalIngresos(totalIngresosCalculados);

    const costo = costoTotal ? parseFloat(costoTotal) : 0;

    const roiCalculado = ((totalIngresosCalculados - costo) / (costo || 1)) * 100;
    setRoi(parseFloat(roiCalculado.toFixed(2))); // Limitamos a 2 decimales
    

    let acumulado = 0;
    let paybackAnio = 'No recuperado';
    for (let i = 0; i < ingresosProyectados.length; i++) {
      acumulado += ingresosProyectados[i].monto;
      if (acumulado >= costo) {
        paybackAnio = ingresosProyectados[i].anio.toString();
        break;
      }
    }
    setPayback(paybackAnio);
  }, [costoTotal, ingresosProyectados]);

  const handleAddProyecto = async () => {
    // Recalcular los ingresos proyectados antes de enviarlos
    const totalIngresosCalculados = ingresosProyectados.reduce(
      (total, ingreso) => total + ingreso.monto,
      0
    );

    const proyecto = {
      nombre,
      descripcion,
      costo_total: parseFloat(costoTotal),
      duracion: parseInt(duracion),
      ingresos_proyectados: ingresosProyectados,
      roi,
      payback,
      total_ingresos: totalIngresosCalculados, // Asegúrate de incluir el total de ingresos proyectados
    };
  
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/proyectos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto),
      });
  
      const responseData = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', responseData);
  
      if (response.ok) {
        console.log('Proyecto creado con éxito');
        router.push('/inversiones');
      } else {
        console.error('Error al crear el proyecto:', responseData);
        alert('Error en el servidor: ' + responseData.detail || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor');
    }
  };
  
  const handleIngresoChange = (index: number, field: keyof IngresoProyectado, value: string | number) => {
    const newIngresos = [...ingresosProyectados];
    newIngresos[index][field] = typeof value === 'string' ? parseInt(value) : value;
    setIngresosProyectados(newIngresos);
  };

  const addIngresoProyectado = () => {
    setIngresosProyectados([...ingresosProyectados, { anio: 0, monto: 0 }]);
  };

  const removeIngresoProyectado = (index: number) => {
    const newIngresos = ingresosProyectados.filter((_, i) => i !== index);
    setIngresosProyectados(newIngresos);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Agregar Nuevo Proyecto</h1>

      {/* Formulario de Proyecto */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Nombre */}
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

        {/* Descripción */}
        <div className="relative lg:col-span-2">
          <label className="block text-black font-bold mb-2">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
            placeholder="Descripción del proyecto"
          />
        </div>

        {/* Costo Total */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Costo Total</label>
          <input
            type="number"
            value={costoTotal}
            onChange={(e) => setCostoTotal(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
            placeholder="Costo total del proyecto"
          />
        </div>

        {/* Duración */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Duración (meses)</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
            placeholder="Duración en meses"
          />
        </div>

        {/* Ingresos Proyectados */}
        <div className="relative lg:col-span-2">
          <label className="block text-black font-bold mb-2">Ingresos Proyectados</label>
          {ingresosProyectados.map((ingreso, index) => (
            <div key={index} className="flex space-x-4 mb-2 items-center">
              <input
                type="number"
                placeholder="Año"
                value={ingreso.anio}
                onChange={(e) => handleIngresoChange(index, 'anio', e.target.value)}
                className="w-1/3 p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
              />
              <input
                type="number"
                placeholder="Monto"
                value={ingreso.monto}
                onChange={(e) => handleIngresoChange(index, 'monto', e.target.value)}
                className="w-2/3 p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
              />
              <button
                type="button"
                onClick={() => removeIngresoProyectado(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addIngresoProyectado}
            className="mt-2 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            <FaPlus className="inline mr-2" />
            Añadir Año
          </button>
        </div>

        {/* Resultados de la Simulación */}
        <div className="relative lg:col-span-2 mt-6 p-4 bg-gray-100 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">Total Ingresos</h3>
            <p className="text-2xl text-green-500">${totalIngresos}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">ROI</h3>
            <p className="text-2xl text-blue-500">{roi.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">Payback</h3>
            <p className="text-2xl text-orange-500">{payback}</p>
          </div>
        </div>
      </form>

      {/* Botón de Crear Proyecto */}
      <button
        onClick={handleAddProyecto}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaCheck className="mr-2" />
        Crear Proyecto
      </button>

      {/* Botón de Volver */}
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

export default AddProyecto;
