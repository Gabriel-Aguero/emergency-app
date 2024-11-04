/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { dbMedication, dbDescartable } from "../context/listado";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormRegisterCart = () => {
  const location = useLocation();
  const { idCarro } = location.state || {};
  const { addMedication, addDescartable } = useContext(AuthContext);

  const sortedMedicacion = dbMedication.sort((a, b) => a.order - b.order);
  const sortedDescartable = dbDescartable.sort((a, b) => a.order - b.order);

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
        <div className="mt-5">
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Complete la Información con el contenido del carro de Emergencia
          </h1>

          <p className="mt-4 leading-relaxed text-gray-500 mb-2">
            En este formulario usted podrá registrar la información en cuanto a
            la medicacion y el material descartable que contiene el carro de
            Emergencia.
          </p>
          <Link
            to="/formulario_de_datos"
            className="mt-5 text-blue-500 hover:underline"
          >
            Registrar un nuevo carro de paro
          </Link>
          <Link
            to="/details_cart"
            className="mt-5 text-blue-500 hover:underline"
          >
            Ver detalle de los carros registrados
          </Link>
        </div>

        <section className="bg-white w-full ">
          {/* Formulario para el registro de medicacion */}
          <form
            action="#"
            className="mt-8 grid grid-cols-6 gap-6"
            onSubmit={handleSaveDataMedication}
          >
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

            {/* Medicación  */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="medication"
                className="block text-sm font-medium text-gray-700"
              >
                Medicación
              </label>
              <select
                name="medication"
                value={medicationData.medication}
                onChange={handleChangeMed}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                aria-label="Selecciona una opcion"
                required
                // onChange={(e) => setServicioName(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione una medicación
                </option>
                {sortedMedicacion.map((medicationList) => (
                  <option
                    key={medicationList.idMedication}
                    value={medicationList.medication}
                  >
                    {medicationList.medication}
                  </option>
                ))}
              </select>
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
                value={medicationData.medExpiration}
                onChange={handleChangeMed}
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
                type="number"
                name="medQuantity"
                value={medicationData.medQuantity}
                onChange={handleChangeMed}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="submit"
              >
                Guardar
              </button>
            </div>

            <div className="col-span-6">
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          </form>

          {/* ******************* Seccion Material descartable ****************  */}
          <form
            action="#"
            className="mt-8 grid grid-cols-6 gap-6"
            onSubmit={handleSaveDataDescartable}
          >
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

              <select
                name="material"
                value={material.material}
                onChange={handleChangeMat}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                aria-label="Selecciona una opción"
                required
                // onChange={(e) => setServicioName(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione una elemento
                </option>
                {sortedDescartable.map((descartableList) => (
                  <option
                    key={descartableList.idDescartable}
                    value={descartableList.descartable}
                  >
                    {descartableList.descartable}
                  </option>
                ))}
              </select>
            </div>

            {/* Lote  */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="lot"
                className="block text-sm font-medium text-gray-700"
                required
              >
                Número de Lote
              </label>

              <input
                type="text"
                name="lot"
                value={material.lot}
                onChange={handleChangeMat}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>

            {/* Fecha de Vencimiento */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="matExpiration"
                className="block text-sm font-medium text-gray-700"
                required
              >
                Fecha de Vencimiento
              </label>

              <input
                type="date"
                name="matExpiration"
                value={material.matExpiration}
                onChange={handleChangeMat}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                required
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
                required
              />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="submit"
                // onClick={handleSaveDataDescartable}
              >
                Guardar
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default FormRegisterCart;
