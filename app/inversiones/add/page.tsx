// app/inversiones/add/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';

const AddProyecto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costoTotal, setCostoTotal] = useState('');
  const [duracion, setDuracion] = useState('');
  const [fuentesFinanciacion, setFuentesFinanciacion] = useState('');
  const [ingresosProyectados, setIngresosProyectados] = useState([{ anio: '', monto: '' }]);

  // Estados para cálculos automáticos
  const [roi, setRoi] = useState(0);
  const [payback, setPayback] = useState('');
  const [totalIngresos, setTotalIngresos] = useState(0);

  const router = useRouter();

  // Actualizar cálculos automáticamente al ingresar valores
  useEffect(() => {
    // Calcular el total de ingresos
    const totalIngresosCalculados = ingresosProyectados.reduce(
      (total, ingreso) => total + (ingreso.monto ? parseFloat(ingreso.monto) : 0),
      0
    );
    setTotalIngresos(totalIngresosCalculados);

    // Calcular ROI
    const roiCalculado = ((totalIngresosCalculados - (costoTotal ? parseFloat(costoTotal) : 0)) / (costoTotal ? parseFloat(costoTotal) : 1)) * 100;
    setRoi(roiCalculado);

    // Calcular período de recuperación (payback)
    let acumulado = 0;
    let paybackAnio = 'No recuperado';
    for (let i = 0; i < ingresosProyectados.length; i++) {
      acumulado += ingresosProyectados[i].monto ? parseFloat(ingresosProyectados[i].monto) : 0;
      if (acumulado >= (costoTotal ? parseFloat(costoTotal) : 0)) {
        paybackAnio = ingresosProyectados[i].anio;
        break;
      }
    }
    setPayback(paybackAnio);
  }, [costoTotal, ingresosProyectados]);

  const handleAddProyecto = () => {
    // Lógica para guardar el proyecto (ejemplo simplificado)
    console.log('Nuevo proyecto:', { nombre, descripcion, costoTotal, duracion, fuentesFinanciacion, ingresosProyectados });
    router.push('/inversiones');
  };

  const handleIngresoChange = (index, field, value) => {
    const newIngresos = [...ingresosProyectados];
    newIngresos[index][field] = value;
    setIngresosProyectados(newIngresos);
  };

  const addIngresoProyectado = () => {
    setIngresosProyectados([...ingresosProyectados, { anio: '', monto: '' }]);
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

        {/* Fuentes de Financiación */}
        <div className="relative lg:col-span-2">
          <label className="block text-black font-bold mb-2">Fuentes de Financiación</label>
          <textarea
            value={fuentesFinanciacion}
            onChange={(e) => setFuentesFinanciacion(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black transition-all duration-300 text-black"
            placeholder="Detalles de las fuentes de financiación"
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
            </div>
          ))}
          <button
            type="button"
            onClick={addIngresoProyectado}
            className="text-blue-500 underline"
          >
            Añadir Ingreso Proyectado
          </button>
        </div>

        {/* Resultados de la Simulación */}
        <div className="relative lg:col-span-2 mt-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold text-black mb-4">Resultados de la Simulación</h2>
          <p className="text-black">Total de Ingresos Proyectados: ${totalIngresos.toLocaleString()}</p>
          <p className="text-black">ROI: {roi.toFixed(2)}%</p>
          <p className="text-black">Período de Recuperación (Payback): {payback}</p>
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
    </div>
  );
};

export default AddProyecto;
