// app/dashboard/page.tsx
'use client';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>
      
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1A3D6D] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Ingresos</h2>
          <p className="text-2xl">$628</p>
        </div>
        <div className="bg-[#1A3D6D] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Gastos</h2>
          <p className="text-2xl">$520</p>
        </div>
        <div className="bg-[#1A3D6D] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Forecast</h2>
          <p className="text-2xl">45%</p>
        </div>
        <div className="bg-[#1A3D6D] text-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl">$108</p>
        </div>
      </div>

      {/* Gráfica de resultados (Placeholder) */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold text-black mb-4">Resultados</h2>
        <div className="h-48 bg-gray-100 rounded-md">
          {/* Aquí va una gráfica, como un gráfico de barras */}
          <p className="text-center text-gray-500">Gráfico de resultados (Placeholder)</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
