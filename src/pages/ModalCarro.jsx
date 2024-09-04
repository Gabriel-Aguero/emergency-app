/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ModalCarro = ({ selectedCarros, isModalOpen, onClose, upDateCarro }) => {
  
  const [cartData, setCartData] = useState(selectedCarros);	
  
  useEffect(() => {
    
  }, []);

  // if (!isModalOpen) return null; 

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    upDateCarro(cartData.idCarro, cartData);
    // enviar datos a la funcion que realiza el update a la base de datos 
  };

  return (
    <div className="flex flex-col fixed inset-0 z-50 items-center justify-center gap-4 w-full mt-5 border p-4 shadow-lg shadow-slate-700">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 mx-auto gap-6 border p-4 bg-slate-50 border-violet-600 rounded-lg shadow-md">
        <h4 className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">Datos del Carro</h4>
        
        <div key={cartData.idCarro} className="col-span-6 sm:col-span-3">
          <label
            htmlFor="numCarro"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero de carro
          </label>
          <input
            type="text"
            name="numCarro"
            value={selectedCarros.numCarro}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="precinto"
            className="block text-sm font-medium text-gray-700"
          >
            Precinto Registrado
          </label>

          <input
            type="number"
            name="precinto"
            onChange={handleChange}
            value={selectedCarros.precinto}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"           
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="fechaInicio"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Inicio
          </label>

          <input
            type="date"
            name="fechaInicio"
            value={selectedCarros.fechaInicio}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"            
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="fecha_ultimo_control"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Último Control
          </label>

          <input
            type="date"
            name="fechaUltimoControl"
            onChange={handleChange}
            value={selectedCarros.fechaUltimoControl}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"                        
          />
        </div>


        <button className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        type="submit">
          Guardar Cambios
        </button>
        <button className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
        type="button"
        onClick={onClose}>
          Cerrar
        </button>        
      </form>
    </div>
  );
};

export default ModalCarro;
