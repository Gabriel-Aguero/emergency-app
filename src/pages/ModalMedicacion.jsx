/* eslint-disable react/prop-types */

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const ModalMedicacion = ({ dataMedicacion, onClose }) => {
  const [medData, setMedData] = useState(dataMedicacion);
  const { updateMedication } = useContext(AuthContext);

  if (!dataMedicacion) return null;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setMedData({
      ...medData,
      [name]: value,
    });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    try {
      await updateMedication(medData, dataMedicacion.id); // Envía la actualización a la API
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

        {/* id del carro de paro  */}
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
            placeholder={dataMedicacion.idCarro}
            value={dataMedicacion.idCarro}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"
          />
        </div>

        {/* Medicación  */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="medication"
            className="block text-sm font-medium text-gray-700"
          >
            Medicación
          </label>

          <input
            type="text"
            name="medication"
            placeholder={dataMedicacion.medication}
            value={dataMedicacion.medication}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"
            required
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
            placeholder={dataMedicacion.lot}
            // value={dataMedicacion.lot}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            required
          />
        </div>

        {/* Cantidad */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="medQuantity"
            className="block text-sm font-medium text-gray-700"
          >
            Cantidad
          </label>

          <input
            type="text"
            name="medQuantity"
            onChange={handleChange}
            placeholder={dataMedicacion.medQuantity}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            required
          />
        </div>

        {/* Fecha de Vencimiento */}
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="medExpiration"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Vencimiento
          </label>

          <input
            type="date"
            name="medExpiration"
            onChange={handleChange}
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            required
          />
        </div>

        <button
          className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          type="submit"
          // onClick={handleOnClick(dataMedicacion)}
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

export default ModalMedicacion;
