import React, { useState } from 'react';

const FormData = ({ username }) => {
  const [medication, setMedication] = useState('');
  const [lot, setLot] = useState('');
  const [medExpiration, setMedExpiration] = useState('');
  const [medQuantity, setMedQuantity] = useState('');
  const [material, setMaterial] = useState('');
  const [matExpiration, setMatExpiration] = useState('');
  const [matQuantity, setMatQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, por ejemplo, enviándolos a una base de datos.
    console.log({
      medication,
      lot,
      medExpiration,
      medQuantity,
      material,
      matExpiration,
      matQuantity
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Bienvenido {username}</h1>
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Completa el formulario de datos</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Medicación</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Medicación"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Lote"
              value={lot}
              onChange={(e) => setLot(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              placeholder="Vencimiento"
              value={medExpiration}
              onChange={(e) => setMedExpiration(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={medQuantity}
              onChange={(e) => setMedQuantity(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Material Descartable</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              placeholder="Vencimiento"
              value={matExpiration}
              onChange={(e) => setMatExpiration(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={matQuantity}
              onChange={(e) => setMatQuantity(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormData;
