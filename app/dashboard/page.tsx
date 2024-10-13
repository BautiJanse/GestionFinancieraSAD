'use client';

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen mx-auto max-w-7xl flex flex-col items-center">
      <h1 className="text-2xl font-bold text-black mb-6">Dashboard</h1>
      
      {/* Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 w-full">
        <div className="bg-green-700 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Ingresos</h2>
          <p className="text-2xl">$628</p>
        </div>
        <div className="bg-red-700 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Gastos</h2>
          <p className="text-2xl">$520</p>
        </div>
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Inversiones</h2>
          <p className="text-2xl">45%</p>
        </div>
        <div className="bg-black text-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl">$108</p>
        </div>
      </div>

      {/* Gráfica de resultados (Placeholder) */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <iframe 
          title="Tablero Futbol" 
          width="100%" 
          height="500px" 
          src="https://app.powerbi.com/reportEmbed?reportId=82c8d459-13a6-4c31-a7aa-a8f62a4b57b9&autoAuth=true&ctid=344979d0-d31d-4c57-8ba0-491aff4acaed">
        </iframe>
      </div>
    </div>
  );
};

export default Dashboard;
