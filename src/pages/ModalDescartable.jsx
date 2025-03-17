/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const ModalDescartable = ({ dataDescartable, onClose }) => {
  const [matData, setMatData] = useState(dataDescartable);
  const { updateDescartable } = useContext(AuthContext);

  if (!dataDescartable) return null;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setMatData({
      ...matData,
      [name]: value,
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      await updateDescartable(matData, dataDescartable.id); // Envía la actualización a la API
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Cambios guardados correctamente",
        text: "La información ha sido actualizada",
        showConfirmButton: false,
        timer: 2000,
      });
      onClose(); // Llama a onClose() que incluye `getListMedication()`
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
            Actualización de Información
          </h4>
        </div>

        {/* id oculto del carro  */}
        <div className="col-span-6 sm:col-span-3 hidden">
          <label
            htmlFor="idCarro"
            className="block text-sm font-medium text-gray-700"
          >
            Id del Carro
          </label>

          <input
            type="text"
            name="idCarro"
            placeholder={dataDescartable.idCarro}
            value={dataDescartable.idCarro}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"
          />
        </div>

        {/* Material  */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="medication"
            className="block text-sm font-medium text-gray-700"
          >
            Material
          </label>

          <input
            type="text"
            name="material"
            placeholder={dataDescartable.material}
            value={dataDescartable.material}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"
            readOnly
          />
        </div>

        {/* Lote  */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="lot"
            className="block text-sm font-medium text-gray-700"
          >
            Lote
          </label>

          <input
            type="text"
            name="lot"
            placeholder={dataDescartable.lot}
            // value={dataDescartable.lot}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        {/* Cantidad */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="matQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>

          <input
            type="text"
            name="matQuantity"
            onChange={handleChange}
            placeholder={dataDescartable.matQuantity}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>

        {/* Fecha de Vencimiento */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="matExpiration"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Vencimiento
          </label>

          <input
            type="date"
            name="matExpiration"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            required
          />
        </div>

        <button
          className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
          onClick={handleOnClick(dataDescartable)}
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

export default ModalDescartable;
