'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaArrowLeft } from 'react-icons/fa'; // Icono para el botón

const AddGasto = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [destiny, setDestiny] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [type, setExpenseType] = useState('');
  const [note, setNote] = useState('');

  const router = useRouter();

  const handleAddGasto = async () => {
    const nuevoGasto = {
      description: description,
      amount: parseFloat(amount),
      fecha: date,
      category: category,
      paymentMethod: paymentMethod,
      type: type,
      nota: note,
    };

    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/gastos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoGasto),
      });

      if (response.ok) {
        console.log('Gasto creado con éxito');
        router.push('/gastos'); // Redirigir a la lista de gastos
      } else {
        const errorData = await response.json();
        console.error('Error al crear el gasto:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Agregar Nuevo Gasto</h1>

      <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Descripción */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Descripción del Gasto</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Descripción del gasto"
          />
        </div>

        {/* Monto */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Monto</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
            placeholder="Monto del gasto"
          />
        </div>

        {/* Fecha */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Fecha del Gasto</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          />
        </div>

        {/* Tipo de Gasto */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Tipo de Gasto</label>
          <select
            value={type}
            onChange={(e) => setExpenseType(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione el tipo de gasto</option>
            <option value="Recurrente">Recurrente</option>
            <option value="Único">Único</option>
          </select>
        </div>

        {/* Categoría */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Categoría del Gasto</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione una categoría</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Servicios">Servicios</option>
            <option value="Transporte">Transporte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="relative">
          <label className="block text-black font-bold mb-2">Destino del Gasto</label>
          <select
            value={destiny}
            onChange={(e) => setDestiny(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione un destino</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Alquiler">Alquiler</option>
            <option value="Servicios">Servicios</option>
            <option value="Transporte">Transporte</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        {/* Método de Pago */}
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
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Cheque">Cheque</option>
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

      {/* Botón de Crear Gasto */}
      <button
        onClick={handleAddGasto}
        className="mt-5 bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:bg-gray-800"
      >
        <FaCheck className="mr-2" />
        Crear Gasto
      </button>
    </div>
  );
};

export default AddGasto;
