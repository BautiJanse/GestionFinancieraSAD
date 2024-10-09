import { useState, useEffect } from 'react';

interface Gasto {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: string; // Añadir el campo type
  paymentMethod: string; // Añadir el campo paymentMethod
  note?: string; // Este campo puede ser opcional
}

interface Params {
  id: string;
}

const GastoPage = ({ params }: { params: Params }) => {
  const [gasto, setGasto] = useState<Gasto | null>(null);

  useEffect(() => {
    const fetchGasto = async () => {
      const gastos = [
        {
          id: 1,
          description: 'Compra de alimentos',
          amount: 100,
          date: '2024-01-01',
          category: 'Alimentos',
          type: 'Único',
          paymentMethod: 'Efectivo',
          note: 'Compra semanal',
        },
        {
          id: 2,
          description: 'Pago de alquiler',
          amount: 500,
          date: '2024-02-01',
          category: 'Alquiler',
          type: 'Recurrente',
          paymentMethod: 'Transferencia',
        },
      ];

      const gastoEncontrado = gastos.find(
        (gasto) => gasto.id === parseInt(params.id)
      );

      if (gastoEncontrado) {
        setGasto(gastoEncontrado);
      }
    };

    fetchGasto();
  }, [params.id]);

  if (!gasto) return <div>Loading...</div>;

  return (
    <div>
      <h1>{gasto.description}</h1>
      <p>Amount: ${gasto.amount}</p>
      <p>Date: {gasto.date}</p>
      <p>Category: {gasto.category}</p>
      <p>Type: {gasto.type}</p>
      <p>Payment Method: {gasto.paymentMethod}</p>
      {gasto.note && <p>Note: {gasto.note}</p>}
    </div>
  );
};

export default GastoPage;