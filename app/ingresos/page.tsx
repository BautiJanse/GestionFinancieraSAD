// app/ingresos/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa';

const IngresosPage = () => {
  const router = useRouter();

  // Simulación de datos de ingresos
  const [ingresos] = useState([
    {
      id: 1,
      description: 'Salario',
      amount: 2000,
      date: '2024-01-01',
      category: 'Salario',
      incomeType: 'Recurrente',
      paymentMethod: 'Transferencia Bancaria',
    },
    {
      id: 2,
      description: 'Venta coche',
      amount: 5000,
      date: '2024-02-15',
      category: 'Venta',
      incomeType: 'Único',
      paymentMethod: 'Efectivo',
    },
    {
      id: 3,
      description: 'Freelance',
      amount: 1200,
      date: '2024-03-10',
      category: 'Freelance',
      incomeType: 'Recurrente',
      paymentMethod: 'Cheque',
    },
  ]);

  // Estados para los filtros
  const [filterCategory, setFilterCategory] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterAmountMin, setFilterAmountMin] = useState('');
  const [filterAmountMax, setFilterAmountMax] = useState('');
  const [filterDateStart, setFilterDateStart] = useState('');
  const [filterDateEnd, setFilterDateEnd] = useState('');
  const [filterIncomeType, setFilterIncomeType] = useState(''); // Nuevo filtro para tipo de ingreso
  const [filterPaymentMethod, setFilterPaymentMethod] = useState(''); // Nuevo filtro para método de pago

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
    const matchesIncomeType = filterIncomeType ? ingreso.incomeType === filterIncomeType : true;
    const matchesPaymentMethod = filterPaymentMethod ? ingreso.paymentMethod === filterPaymentMethod : true;

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
            <option value="Freelance">Freelance</option>
            <option value="Inversiones">Inversiones</option>
            <option value="Venta">Venta</option>
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
              <p className="text-sm text-gray-500">{ingreso.date}</p>
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
