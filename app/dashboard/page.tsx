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

  const [ingresosMensuales, setIngresosMensuales] = useState<number[]>([]);
  const [gastosMensuales, setGastosMensuales] = useState<number[]>([]);
  const [dateLabels, setDateLabels] = useState<string[]>([]);

  const [chartType, setChartType] = useState('bar');
  const isAuthenticated = useAuth();

  // Función para obtener los datos de resumen
  const fetchResumen = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/resumen/');
      const data = await response.json();

      setTotalIngresos(data.total_ingresos_recurrentes || 0);
      setTotalGastos(data.total_gastos_recurrentes || 0);
      setTotalInvertido(data.total_costo_proyectos || 0);
      setBalance(data.total_ingresos_recurrentes - data.total_gastos_recurrentes || 0);
    } catch (error) {
      console.error('Error al obtener el resumen:', error);
    }
  };

  // Función para obtener los datos de ingresos
  const fetchIngresos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/ingresos');
      const data = await response.json();

      const monthlyData: Record<string, number> = {};
      data.forEach((item: { fecha: string; amount: number }) => {
        const date = new Date(item.fecha);
        const label = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (!monthlyData[label]) monthlyData[label] = 0;
        monthlyData[label] += item.amount;
      });

      setIngresosMensuales(Object.values(monthlyData));
      setDateLabels(Object.keys(monthlyData));
    } catch (error) {
      console.error('Error al obtener los ingresos:', error);
    }
  };

  // Función para obtener los datos de gastos
  const fetchGastos = async () => {
    try {
      const response = await fetch('https://back-finanzas.onrender.com/api/gastos');
      const data = await response.json();

      const monthlyData: Record<string, number> = {};
      data.forEach((item: { fecha: string; amount: number }) => {
        const date = new Date(item.fecha);
        const label = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (!monthlyData[label]) monthlyData[label] = 0;
        monthlyData[label] += item.amount;
      });

      setGastosMensuales(Object.values(monthlyData));
    } catch (error) {
      console.error('Error al obtener los gastos:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchResumen();
    fetchIngresos();
    fetchGastos();
  }, [isAuthenticated]);

  const handleChartTypeChange = (type: string) => {
    setChartType(type);
  };

  const barChartData = {
    labels: ['Ingresos', 'Gastos', 'Inversiones', 'Balance'],
    datasets: [
      {
        label: 'Resumen Financiero',
        data: [totalIngresos, totalGastos, totalInvertido, balance],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107', '#000000'],
      },
    ],
  };

  const barChartIngresosGastos = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Ingresos',
        data: ingresosMensuales,
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Gastos',
        data: gastosMensuales,
        backgroundColor: '#F44336',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Ingresos', 'Gastos', 'Inversiones'],
    datasets: [
      {
        data: [totalIngresos, totalGastos, totalInvertido],
        backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
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
          <h2 className="text-lg font-semibold">Inversiones</h2>
          <p className="text-xl">${totalInvertido.toLocaleString()}</p>
        </div>
        <div className="bg-black text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-xl">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Selector de Gráficos */}
      <div className="mb-4 flex space-x-4">
        {['bar', 'ingresos_gastos', 'doughnut'].map((type) => (
          <button
            key={type}
            onClick={() => handleChartTypeChange(type)}
            className={`px-4 py-2 border rounded-lg ${
              chartType === type ? 'bg-black text-white' : 'bg-gray-200 text-black'
            } hover:bg-gray-300`}
          >
            {type === 'bar' && 'Barras'}
            {type === 'ingresos_gastos' && 'Ingresos vs Gastos'}
            {type === 'doughnut' && 'Distribución'}
          </button>
        ))}
      </div>

      {/* Gráfico Dinámico */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-full h-[400px]">
        {chartType === 'bar' && <Bar data={barChartData} options={{ maintainAspectRatio: false, responsive: true }} />}
        {chartType === 'ingresos_gastos' && (
          <Bar data={barChartIngresosGastos} options={{ maintainAspectRatio: false, responsive: true }} />
        )}
        {chartType === 'doughnut' && (
          <Doughnut data={doughnutChartData} options={{ maintainAspectRatio: false, responsive: true }} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
