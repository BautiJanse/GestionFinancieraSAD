'use client';
import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalInvertido, setTotalInvertido] = useState(0);
  const [balance, setBalance] = useState(0);

  // Hook de autenticación
  const isAuthenticated = useAuth();

  // Función para obtener los datos del resumen financiero
  const fetchResumenFinanciero = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/resumen/');
      const data = await response.json();

      setTotalIngresos(data.total_ingresos_recurrentes || 0);
      setTotalGastos(data.total_gastos_recurrentes || 0);
      setTotalInvertido(data.total_costo_proyectos || 0);
      setBalance((data.total_ingresos_recurrentes || 0) - (data.total_gastos_recurrentes || 0));
    } catch (error) {
      console.error('Error al obtener el resumen financiero:', error);
    }
  };

  // Función para mantener la base de datos activa
  const keepDatabaseAlive = async () => {
    try {
      await fetch('https://back-finanzas.onrender.com/api/ping');
      console.log('Ping exitoso');
    } catch (error) {
      console.error('Error al hacer ping a la base de datos:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return; // Evitar ejecutar lógica si no está autenticado

    // Llamar a la función para obtener los datos
    fetchResumenFinanciero();

    // Configurar el intervalo para mantener la base de datos activa
    const interval = setInterval(() => {
      keepDatabaseAlive();
    }, 180000); // Cada 3 minutos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [isAuthenticated]); // Ejecutar solo si cambia el estado de autenticación

  // Mostrar solo si está autenticado
  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>; // Puedes manejar mejor esta redirección
  }

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
        <iframe
          title="Tablero Futbol 2"
          width="100%"
          height="500px"
          src="https://app.powerbi.com/reportEmbed?reportId=c45a8246-77a0-4538-aa79-3a9755e46f63&autoAuth=true&ctid=344979d0-d31d-4c57-8ba0-491aff4acaed"
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
