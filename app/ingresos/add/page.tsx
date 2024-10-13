'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck, FaArrowLeft } from 'react-icons/fa'; // Icono para el botón

const AddIngreso = () => {
  const [description, setDescription] = useState(''); 
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');
  const [tipo_ingreso, setIncomeType] = useState(''); // Nuevo estado para el tipo de ingreso

  const router = useRouter();

  const handleAddIngreso = async () => {
    // Crear el objeto del nuevo ingreso con los datos del formulario
    const nuevoIngreso = {
      description: description,
      amount: parseFloat(amount), // Asegurarse de convertir el monto a número
      fecha: date,
      category: category,
      paymentMethod: paymentMethod,     
      tipo_ingreso: tipo_ingreso, // Incluye tipo de ingreso
      nota: note,
    };
  
    try {
      // Realiza la solicitud POST a la API del backend en Render
      const response = await fetch('https://back-finanzas.onrender.com/api/ingresos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoIngreso), // Enviar los datos como JSON
      });
  
      if (response.ok) {
        // Si el ingreso se creó correctamente, redirigir a la página de ingresos
        console.log('Ingreso creado con éxito');
        router.push('/ingresos'); // Redirigir a la lista de ingresos
      } else {
        // Si hubo un error en la respuesta, manejar el error
        const errorData = await response.json();
        console.error('Error al crear el ingreso:', errorData);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
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

        {/* Tipo de Ingreso */}
        <div className="relative">
          <label className="block text-black font-bold mb-2">Tipo de Ingreso</label>
          <select
            value={tipo_ingreso}
            onChange={(e) => setIncomeType(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none transition-all duration-300 text-black"
          >
            <option value="">Seleccione el tipo de ingreso</option>
            <option value="Recurrente">Recurrente</option>
            <option value="Único">Único</option>
          </select>
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

export default AddIngreso;
