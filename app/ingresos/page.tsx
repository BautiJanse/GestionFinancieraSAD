'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

// Definimos la interfaz para un Ingreso
interface Ingreso {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  metodo_pago: string;
  nota: string;
  tipo_ingreso: string;
}

const IngresosPage = () => {
  const router = useRouter();

  // Estados para los ingresos, el estado de carga y errores
  const [ingresos, setIngresos] = useState<Ingreso[]>([]); // Definimos el tipo Ingreso[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // El error es opcional y puede ser null

  // Estados para los filtros
  const [filterCategory, setFilterCategory] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [filterIncomeType, setFilterIncomeType] = useState(''); // Filtro para tipo de ingreso
  const [filterPaymentMethod, setFilterPaymentMethod] = useState(''); // Filtro para método de pago

  // Función para traer los ingresos
  const fetchIngresos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/ingresos/');
      if (!response.ok) {
        throw new Error('Error al obtener los ingresos');
      }
      const data = await response.json();
      setIngresos(data);
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

  // Función para mantener activa la base de datos
  const keepDatabaseAlive = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/ingresos/');
      if (!response.ok) {
        throw new Error('Error al mantener activa la base de datos');
      }
      const data = await response.json();
      if (data.length > 0) {
        console.log('Primer ingreso:', data[0]); // Log para verificar que la función trabaja correctamente
      }
    } catch (error) {
      console.error('Error al mantener activa la base de datos:', error);
    }
  };

  // useEffect para inicializar los ingresos
  useEffect(() => {
    fetchIngresos();

    // Mantener la base de datos activa cada 3 minutos
    const interval = setInterval(() => {
      keepDatabaseAlive();
    }, 180000); // 180000ms = 3 minutos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  // Función para filtrar ingresos
  const filteredIngresos = ingresos.filter((ingreso) => {
    const matchesCategory = filterCategory ? ingreso.category === filterCategory : true;
    const matchesName = filterName ? ingreso.description.toLowerCase().includes(filterName.toLowerCase()) : true;
    const matchesAmount =
      (filterAmountMin ? ingreso.amount >= parseFloat(filterAmountMin) : true) &&
      (filterAmountMax ? ingreso.amount <= parseFloat(filterAmountMax) : true);
    const matchesDate =
      (filterDateStart ? new Date(ingreso.date) >= new Date(filterDateStart) : true) &&
      (filterDateEnd ? new Date(ingreso.date) <= new Date(filterDateEnd) : true);
    const matchesIncomeType = filterIncomeType ? ingreso.tipo_ingreso === filterIncomeType : true;
    const matchesPaymentMethod = filterPaymentMethod ? ingreso.metodo_pago === filterPaymentMethod : true;

    return (
      matchesCategory &&
      matchesName &&
      matchesAmount &&
      matchesDate &&
      matchesIncomeType &&
      matchesPaymentMethod
    );
  });

  const handleIngresoClick = (id: number) => {
    router.push(`/ingresos/${id}`);
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Ingresos</h1>

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
            <option value="Salario">Salario</option>
            <option value="Inversiones">Inversiones</option>
            <option value="Ventas">Ventas</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Tipo de Ingreso */}
        <div>
          <label className="block text-black font-bold mb-2">Tipo de Ingreso</label>
          <select
            value={filterIncomeType}
            onChange={(e) => setFilterIncomeType(e.target.value)}
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

        {/* Nombre del ingreso */}
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
      </div>

      {/* Lista de ingresos filtrada */}
      <div className="space-y-4">
        {filteredIngresos.map((ingreso) => (
          <div
            key={ingreso.id}
            onClick={() => handleIngresoClick(ingreso.id)}
            className="flex justify-between items-center bg-gray-100 text-black p-4 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <div>
              <h2 className="text-lg font-semibold">{ingreso.description}</h2>
              <p className="text-sm text-gray-500"> {new Date(ingreso.date).toLocaleDateString('es-AR')}</p>
            </div>
            <div>
              <p className="text-lg font-bold">${ingreso.amount}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botón de agregar ingreso */}
      <button
        onClick={() => router.push('/ingresos/add')}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaPlus className="text-xl" />
      </button>
    </div>
  );
};

export default IngresosPage;
