'use client';
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalInvertido, setTotalInvertido] = useState(0);
  const [balance, setBalance] = useState(0);

  // Función para obtener los datos del resumen financiero (ingresos y gastos)
  const fetchResumenFinanciero = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/resumen/'); // Endpoint para obtener resumen financiero
      const data = await response.json();

      // Actualizamos los datos según las claves correctas
      setTotalIngresos(data.total_ingresos_recurrentes); // Actualizar el total de ingresos
      setTotalGastos(data.total_gastos_recurrentes); // Actualizar el total de gastos
      setTotalInvertido(data.total_costo_proyectos);
      setBalance(data.total_ingresos_recurrentes - data.total_gastos_recurrentes); // Calcular el balance
    } catch (error) {
      console.error('Error al obtener el resumen financiero:', error);
    }
  };

  useEffect(() => {
    fetchResumenFinanciero();
  }, []);

   // Función de ping para mantener la base de datos activa
   const keepDatabaseAlive = async () => {
    try {
      // Puedes usar un endpoint simple, incluso el mismo `/api/resumen/`
      await fetch('https://back-finanzas.onrender.com/api/ping'); // Endpoint de ping
      console.log('Ping exitoso');
    } catch (error) {
      console.error('Error al hacer ping a la base de datos:', error);
    }
  };

  useEffect(() => {
    fetchResumenFinanciero();

    // Intervalo para mantener la base de datos activa
    const interval = setInterval(() => {
      keepDatabaseAlive();
    }, 60000); // 3 minutos (180,000 ms)

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen mx-auto max-w-7xl flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>
      
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 w-full">
        <div className="bg-green-700 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Ingresos</h2>
          <p className="text-2xl">${totalIngresos}</p> 
        </div>
        <div className="bg-red-700 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Gastos</h2>
          <p className="text-2xl">${totalGastos}</p>
        </div>
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Inversiones</h2>
          <p className="text-2xl">${totalInvertido}</p>
        </div>
        <div className="bg-black text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl">${balance}</p>
        </div>
      </div>

      {/* Gráfica de resultados (Placeholder) */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <iframe title="Tablero Futbol 2" width="100%" height="500px" src="https://app.powerbi.com/reportEmbed?reportId=c45a8246-77a0-4538-aa79-3a9755e46f63&autoAuth=true&ctid=344979d0-d31d-4c57-8ba0-491aff4acaed"></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
