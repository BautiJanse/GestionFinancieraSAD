// app/ingresos/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa'; // Icono para el botón

const AddIngreso = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');

  const router = useRouter();

  const handleAddIngreso = () => {
    // Lógica para manejar el nuevo ingreso (ej. llamada a una API)
    console.log('Nuevo ingreso:', { description, amount, date, category, paymentMethod, note });

    // Después de agregar el ingreso, redirigimos de nuevo a la lista de ingresos
    router.push('/ingresos');
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Agregar Nuevo Ingreso</h1>

      {/* Formulario Expandido */}
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Descripción */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Descripción del Ingreso</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Descripción del ingreso"
          />
        </div>

        {/* Cantidad */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Monto del ingreso"
          />
        </div>

        {/* Fecha */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Fecha del Ingreso</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          />
        </div>

        {/* Categoría */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Categoría del Ingreso</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione una categoría</option>
            <option value="Salario">Salario</option>
            <option value="Freelance">Freelance</option>
            <option value="Inversiones">Inversiones</option>
            <option value="Venta">Venta</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Método de pago */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Método de Pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione un método de pago</option>
            <option value="Transferencia Bancaria">Transferencia Bancaria</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Cheque">Cheque</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Nota */}
        <div className="relative col-span-1 lg:col-span-2">
          <label className="block text-black font-bold mb-2">Nota</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Agregar una nota adicional (opcional)"
          />
        </div>
      </form>

      {/* Botón de Crear Ingreso */}
      <button
        onClick={handleAddIngreso}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaCheck className="mr-2" />
        Crear Ingreso
      </button>
    </div>
  );
};

export default AddIngreso;
