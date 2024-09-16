/* eslint-disable react/prop-types */

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ModalCarro = ({ selectedCarros, isModalOpen, onClose }) => {
  const [cartData, setCartData] = useState({});
  const { updateCarro } = useContext(AuthContext);

  // Inicializa cartData con los valores de selectedCarros cuando el modal se abre
  useEffect(() => {
    if (isModalOpen && selectedCarros) {
      setCartData({
        numCarro: selectedCarros.numCarro || "",
        precintoMedicacion: selectedCarros.precintoMedicacion || "",
        precintoDescartable: selectedCarros.precintoDescartable || "",
        fechaInicio: selectedCarros.fechaInicio || "",
        fechaUltimoControl: selectedCarros.fechaUltimoControl || "",
      });
    }
  }, [isModalOpen, selectedCarros]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const newDate = name === "fechaUltimoControl" ? new Date(value) : value;

    setCartData({
      ...cartData,
      [name]: newDate,
    });
  };

  const handleOnClick = (items) => {
    updateCarro(cartData, items.id);
  };

  return (
    <div className="flex flex-col fixed inset-0 z-50 items-center justify-center gap-4 w-full mt-5 border p-4 shadow-lg shadow-slate-700">
      <form className="grid grid-cols-1 mx-auto gap-6 border p-4 bg-slate-50 border-violet-600 rounded-lg shadow-md">
        <div className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
          <h4 className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
            Datos del Carro
          </h4>
          <p className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold underline mt-2">
            {selectedCarros.numCarro}
          </p>
        </div>

        <div
          key={selectedCarros.idCarro}
          className="col-span-6 sm:col-span-3 hidden"
        >
          <label
            htmlFor="numCarro"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero de carro
          </label>
          <input
            type="text"
            name="numCarro"
            placeholder={selectedCarros.numCarro}
            value={selectedCarros.numCarro}
            onChange={handleChange}
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
            placeholder={selectedCarros.fechaInicio}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="precintoMedicacion"
            className="block text-sm font-medium text-gray-700"
          >
            Precinto Medicación
          </label>

          <input
            type="text"
            name="precintoMedicacion"
            onChange={handleChange}
            placeholder={selectedCarros.precintoMedicacion}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="precintoDescartable"
            className="block text-sm font-medium text-gray-700"
          >
            Precinto Descartable
          </label>

          <input
            type="text"
            name="precintoDescartable"
            onChange={handleChange}
            placeholder={selectedCarros.precintoDescartable}
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
            placeholder={selectedCarros.fechaUltimoControl}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        <button
          className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="button"
          onClick={handleOnClick(selectedCarros)}
        >
          Guardar Cambios
        </button>
        <button
          className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="button"
          onClick={onClose}
        >
          Cerrar
        </button>
      </form>
    </div>
  );
};

export default ModalCarro;
