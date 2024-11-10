/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const ModalCarro = ({ selectedCarros, onClose }) => {
  const [cartData, setCartData] = useState(selectedCarros);
  const { updateCarro } = useContext(AuthContext);
  const today = new Date().toLocaleDateString();

  if (!selectedCarros) return null;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      await updateCarro(cartData, selectedCarros.id); // Envía la actualización a la API
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Cambios guardados correctamente",
        text: "La información ha sido actualizada",
        showConfirmButton: false,
        timer: 2000,
      });
      onClose(); // Llama a onClose() que incluye `getListCarro()`
    } catch (error) {
      console.error("Error updating medication:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la información",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex flex-col fixed inset-0 z-50 items-center justify-center gap-4 w-full mt-5 border p-4 shadow-lg shadow-slate-700">
      <form
        className="grid grid-cols-1 mx-auto gap-6 border p-4 bg-slate-50 border-violet-600 rounded-lg shadow-md"
        onSubmit={handleOnClick}
      >
        <div className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
          <h4 className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
            Datos del Carro
          </h4>
          <p className="col-span-6 sm:col-span-6 text-center text-violet-600 font-semibold underline mt-2">
            <span>Fecha de Inicio: </span>
            {selectedCarros.fechaInicio}
          </p>
        </div>

        <div key={selectedCarros.id} className="col-span-6 sm:col-span-3">
          <label
            htmlFor="servicioName"
            className="block text-sm font-medium text-gray-700"
          >
            Servicio
          </label>

          <input
            type="text"
            name="servicioName"
            placeholder={selectedCarros.servicioName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"
            readOnly
          />
        </div>

        <div className="col-span-6 sm:col-span-3 hidden">
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
            htmlFor="fechaUltimoControl"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Último Control
          </label>

          <input
            type="text"
            name="fechaUltimoControl"
            placeholder={today}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm required"
            required
            readOnly
          />
        </div>

        <button
          className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
          // onClick={handleOnClick(selectedCarros)}
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
