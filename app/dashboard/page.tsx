'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import useAuth from '../../hooks/useAuth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [totalInvertido, setTotalInvertido] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalProyecto, setTotalProyecto] = useState(0);
  const isAuthenticated = useAuth();

  const fetchAllProyectos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/proyectos');
      const data: { costo_total: number | string }[] = await response.json();

      // Calcular el total de proyectos
      const total = data.reduce((sum: number, proyecto) => {
        return sum + parseFloat(proyecto.costo_total.toString() || '0');
      }, 0);

      console.log('Total de Proyectos:', data);
      setTotalProyecto(total);
    } catch (error) {
      console.error('Error al obtener los proyectos:', error);
    }
  };

  const fetchAllIngresos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/ingresos');
      const data: { amount: number | string; category: string }[] = await response.json();

      // Calcular total de ingresos
      const total = data.reduce((sum: number, ingreso) => {
        return sum + parseFloat(ingreso.amount.toString() || '0');
      }, 0);

      setTotalIngresos(total);

      // Calcular ingresos de tipo Inversiones
      const inversiones = data.filter((ingreso) => ingreso.category === 'Inversiones');
      const totalInversiones = inversiones.reduce((sum: number, ingreso) => {
        return sum + parseFloat(ingreso.amount.toString() || '0');
      }, 0);

      console.log('Total de Inversiones:', totalInversiones);
      setTotalInvertido(totalInversiones);
    } catch (error) {
      console.error('Error al obtener los ingresos:', error);
    }
  };

  const fetchAllGastos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/gastos');
      const data: { amount: number | string }[] = await response.json();

      // Calcular total de gastos
      const total = data.reduce((sum: number, gasto) => {
        return sum + parseFloat(gasto.amount.toString() || '0');
      }, 0);

      setTotalGastos(total);
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchAllIngresos();
    fetchAllGastos();
    fetchAllProyectos();
  }, [isAuthenticated]);

  // Calcula el balance una vez que se obtienen ingresos y gastos
  useEffect(() => {
    setBalance(totalIngresos - totalGastos);
  }, [totalIngresos, totalGastos]);

  const barChartData = {
    labels: ['Ingresos', 'Gastos', 'Proyectos', 'Balance'],
    datasets: [
      {
        label: 'Resumen Financiero',
        data: [totalIngresos, totalGastos, totalProyecto, balance],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [totalIngresos, totalGastos],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  };

  if (!isAuthenticated) {
    return <div>Redirigiendo...</div>;
  }

  return (
    <div className="p-6 bg-white min-h-screen mx-auto max-w-7xl flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>

      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
        <div className="bg-green-700 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Ingresos</h2>
          <p className="text-xl">${totalIngresos.toLocaleString()}</p>
        </div>
        <div className="bg-red-700 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Gastos</h2>
          <p className="text-xl">${totalGastos.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Proyectos</h2>
          <p className="text-xl">${totalProyecto.toLocaleString()}</p>
        </div>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-xl">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full md:w-1/2 h-[400px]">
          <Bar data={barChartData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full md:w-1/2 h-[400px]">
          <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
