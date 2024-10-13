'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

// Definir la interfaz para el tipo de Gasto
interface Gasto {
  id: number;
  descripcion: string;
  monto: number;
  fecha: string;
  categoria: string;
  tipo_gasto: string;
  metodo_pago: string;
}

const GastosPage = () => {
  const router = useRouter();

  // Estados para los gastos, el estado de carga y errores
  const [gastos, setGastos] = useState<Gasto[]>([]); // Usamos el tipo Gasto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para los filtros
  const [filterCategory, setFilterCategory] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [filterExpenseType, setFilterExpenseType] = useState(''); // Filtro para tipo de gasto
  const [filterPaymentMethod, setFilterPaymentMethod] = useState(''); // Filtro para método de pago

  // useEffect para hacer la llamada a la API al montar el componente
  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await fetch('https://back-finanzas.onrender.com/api/gastos');
        const data = await response.json();
        setGastos(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGastos();
  }, []);

  // Función para filtrar gastos
  const filteredGastos = gastos.filter((gasto) => {
    const matchesCategory = filterCategory ? gasto.categoria === filterCategory : true;
    const matchesName = filterName ? gasto.descripcion.toLowerCase().includes(filterName.toLowerCase()) : true;
    const matchesAmount =
      (filterAmountMin ? gasto.monto >= parseFloat(filterAmountMin) : true) &&
      (filterAmountMax ? gasto.monto <= parseFloat(filterAmountMax) : true);
    const matchesDate =
      (filterDateStart ? new Date(gasto.fecha) >= new Date(filterDateStart) : true) &&
      (filterDateEnd ? new Date(gasto.fecha) <= new Date(filterDateEnd) : true);
    const matchesExpenseType = filterExpenseType ? gasto.tipo_gasto === filterExpenseType : true;
    const matchesPaymentMethod = filterPaymentMethod ? gasto.metodo_pago === filterPaymentMethod : true;

    return (
      matchesCategory &&
      matchesName &&
      matchesAmount &&
      matchesDate &&
      matchesExpenseType &&
      matchesPaymentMethod
    );
  });

  const handleGastoClick = (id: number) => {
    router.push(`/gastos/${id}`);
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Gastos</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Categoría */}
        <div>
          <label className="block text-black font-bold mb-2">Categoría</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Todas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Servicios">Servicios</option>
            <option value="Transporte">Transporte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Tipo de Gasto */}
        <div>
          <label className="block text-black font-bold mb-2">Tipo de Gasto</label>
          <select
            value={filterExpenseType}
            onChange={(e) => setFilterExpenseType(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Todos</option>
            <option value="Recurrente">Recurrente</option>
            <option value="Único">Único</option>
          </select>
        </div>

        {/* Método de Pago */}
        <div>
          <label className="block text-black font-bold mb-2">Método de Pago</label>
          <select
            value={filterPaymentMethod}
            onChange={(e) => setFilterPaymentMethod(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Todos</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Cheque">Cheque</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Nombre del gasto */}
        <div>
          <label className="block text-black font-bold mb-2">Nombre</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Buscar por nombre"
          />
        </div>

        {/* Monto mínimo */}
        <div>
          <label className="block text-black font-bold mb-2">Monto mínimo</label>
          <input
            type="number"
            value={filterAmountMin}
            onChange={(e) => setFilterAmountMin(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Monto mínimo"
          />
        </div>

        {/* Monto máximo */}
        <div>
          <label className="block text-black font-bold mb-2">Monto máximo</label>
          <input
            type="number"
            value={filterAmountMax}
            onChange={(e) => setFilterAmountMax(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Monto máximo"
          />
        </div>

        {/* Fecha inicio */}
        <div>
          <label className="block text-black font-bold mb-2">Fecha desde</label>
          <input
            type="date"
            value={filterDateStart}
            onChange={(e) => setFilterDateStart(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="block text-black font-bold mb-2">Fecha hasta</label>
          <input
            type="date"
            value={filterDateEnd}
            onChange={(e) => setFilterDateEnd(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          />
        </div>
      </div>

      {/* Lista de gastos filtrada */}
      <div className="space-y-4">
        {filteredGastos.map((gasto) => (
          <div
            key={gasto.id}
            onClick={() => handleGastoClick(gasto.id)}
            className="flex justify-between items-center bg-gray-100 text-black p-4 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div>
              <h2 className="text-lg font-semibold">{gasto.descripcion}</h2>
              <p className="text-sm text-gray-500">{gasto.fecha}</p>
            </div>
            <div>
              <p className="text-lg font-bold">${gasto.monto}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de agregar gasto */}
      <button
        onClick={() => router.push('/gastos/add')}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-300"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default GastosPage;
