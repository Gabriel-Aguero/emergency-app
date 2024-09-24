/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const FormRegisterCart = ({ idCarro }) => {
  const { addMedication, addDescartable } = useContext(AuthContext);

  // variables para el formulario de medicación
  const [medicationData, setMedicationData] = useState({
    idCarro: "",
    medication: "",
    lot: "",
    medExpiration: "",
    medQuantity: "",
  });

  // variables para el formulario de descartable
  const [material, setMaterial] = useState({
    idCarro: "",
    material: "",
    lot: "",
    matExpiration: "",
    matQuantity: "",
  });

  // Envio de datos al back de medicación
  const handleSaveDataMedication = async (e) => {
    e.preventDefault();
    await addMedication(medicationData);

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Datos guardados correctamente",
      text: "Los informaciónse ha registrado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });

    setMedicationData({
      idCarro: "",
      medication: "",
      lot: "",
      medExpiration: "",
      medQuantity: "",
    });
  };

  // Envio de datos al back de material descartable
  const handleSaveDataDescartable = async (e) => {
    e.preventDefault();
    await addDescartable(material);

    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Datos guardados correctamente",
      text: "Los informaciónse ha registrado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });

    setMaterial({
      idCarro: "",
      material: "",
      lot: "",
      matExpiration: "",
      matQuantity: "",
    });
  };

  // Capturo los datos del formulario de medicación
  const handleChangeMed = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicationData({
      ...medicationData,
      idCarro: idCarro,
      [name]: value,
    });
  };

  // Capturo los datos del formulario de material descartable
  const handleChangeMat = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMaterial({
      ...material,
      idCarro: idCarro,
      [name]: value,
    });
  };

  return (
    <main className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16">
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl capitalize">
            Formulario de registro
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500">
            En este formulario podrás registrar la medicacion y el material
            descartable del carro de paro.
          </p>
        </div>

        {/* Formulario para el registro de medicacion y material descartable  */}
        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
          {/* ******************* Seccion Medicacion ****************  */}

          <div className="col-span-6 sm:col-span-6">
            <h4 className="text-2xl font-bold text-gray-600">
              Sección Medicación
            </h4>
          </div>

          {/* id oculto del carro  */}
          <div className="col-span-6 sm:col-span-3 hidden">
            <label
              htmlFor="idCarro"
              className="block text-sm font-medium text-gray-700"
            >
              Id del carro
            </label>

            <input
              type="text"
              name="idCarro"
              value={idCarro ? idCarro : ""}
              onChange={handleChangeMed}
              readOnly
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* Medicacion  */}
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
              value={medicationData.medication}
              onChange={handleChangeMed}
              required
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm required"
            />
          </div>

          {/* Lote  */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="lot"
              className="block text-sm font-medium text-gray-700"
            >
              Numero de Lote
            </label>

            <input
              type="text"
              name="lot"
              value={medicationData.lot}
              onChange={handleChangeMed}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
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
              value={medicationData.medExpiration}
              onChange={handleChangeMed}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
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
              type="number"
              name="medQuantity"
              value={medicationData.medQuantity}
              onChange={handleChangeMed}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              type="button"
              onClick={handleSaveDataMedication}
            >
              Guardar
            </button>
          </div>

          <div className="col-span-6">
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
          {/* ******************* Seccion Material descartable ****************  */}

          <div className="col-span-6 sm:col-span-6">
            <h4 className="text-2xl font-bold text-gray-600">
              Sección Material Descartable
            </h4>
          </div>

          {/* id oculto del carro  */}
          <div className="col-span-6 sm:col-span-3 hidden">
            <label
              htmlFor="fechaInicio"
              className="block text-sm font-medium text-gray-700"
            >
              Id del carro
            </label>

            <input
              type="text"
              name="carroId"
              placeholder="carroId"
              value={idCarro ? idCarro : ""}
              onChange={handleChangeMat}
              readOnly
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* Material Descartable */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="material"
              className="block text-sm font-medium text-gray-700"
            >
              Material
            </label>

            <input
              type="text"
              name="material"
              value={material.material}
              onChange={handleChangeMat}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          {/* Lote  */}
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="lot"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Lote
            </label>

            <input
              type="text"
              name="lot"
              value={material.lot}
              onChange={handleChangeMat}
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
              value={material.matExpiration}
              onChange={handleChangeMat}
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
              type="number"
              name="matQuantity"
              value={material.matQuantity}
              onChange={handleChangeMat}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              type="button"
              onClick={handleSaveDataDescartable}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default FormRegisterCart;
