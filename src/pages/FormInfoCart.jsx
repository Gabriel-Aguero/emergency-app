/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import { EyeIcon, IconEdit } from "../components/icons/Icons";
import ModalCarro from "./ModalCarro";
import { IconArrowUp } from "../components/icons/Icons";

const FormInfoCart = ({ carros, serviceName }) => {
  const {
    medications,
    getMedicationByCarro,
    descartables,
    getDescartableByCarro,
  } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  const [showTable, setShowTable] = useState(false);
  const [idCarro, setIdCarro] = useState(null);

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setIsModalOpen(true);
    setSelectedCarros(carro);
  };

  const handleViewDetailsCar = async (idCarro) => {
    setShowTable(true);
    setIdCarro(idCarro);
    await getMedicationByCarro(idCarro);
    await getDescartableByCarro(idCarro);
  };

  return (
    <main className="flex flex-col items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-blue-300/30">
      <p className="text-2xl font-semibold mb-2">
        Servicio:{" "}
        <span className="text-orange-600 font-bold capitalize">
          {serviceName}
        </span>
      </p>
      <span className="text-xl font-semibold">
        Se han registrado {carros.length ? carros.length : "..."} Carros de paro{" "}
      </span>
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        {carros.map((carro) => (
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900 mt-4">
              <h2 className="font-semibold text-blue-800">
                Número de Identificación del carro: {carro.numCarro}
              </h2>

              <IconArrowUp />
            </summary>

            <div className="flex gap-4 justify-between mt-4 px-4 leading-relaxed text-gray-700 border-b py-2 border-gray-400 dark:border-gray-700">
              <p className="font-bold text-gray-700 dark:text-gray-400">
                Fecha de Inicio:
              </p>
              <span>{carro.fechaInicio}</span>
            </div>

            <div className="flex gap-4 justify-between mt-4 px-4 leading-relaxed text-gray-700 border-b py-2 border-gray-400 dark:border-gray-700">
              <p className="font-bold text-gray-700 dark:text-gray-400">
                Precinto sección medicación:
              </p>
              <span>{carro.precintoMedicacion}</span>
            </div>

            <div className="flex gap-4 justify-between mt-4 px-4 leading-relaxed text-gray-700 border-b py-2 border-gray-400 dark:border-gray-700">
              <p className="font-bold text-gray-700 dark:text-gray-400">
                Precinto sección descartable:
              </p>
              <span>{carro.precintoDescartable}</span>
            </div>

            <div className="flex gap-4 justify-between mt-4 px-4 leading-relaxed text-gray-700 border-b py-2 border-gray-400 dark:border-gray-700">
              <p className="font-bold text-gray-700 dark:text-gray-400">
                Fecha Último Control:
              </p>
              <span>{carro.fechaUltimoControl}</span>
            </div>

            <button
              className="inline-flex items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleViewDetailsCar(carro.id)}
            >
              Ver Detalle
              <EyeIcon />
            </button>

            <button
              className="inline-flex items-center px-3 m-2 gap-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleEdit(carro)}
            >
              Editar
              <IconEdit />
            </button>

            <ModalCarro
              selectedCarros={selectedCarros}
              isModalOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </details>
        ))}
      </div>
      {/* aqui tiene que ir la tabla de medicacion y material descartable   */}
      {showTable ? (
        <>
          <MedicacionList medicacionList={medications} idCarro={idCarro} />
          <DescartableList descartablesList={descartables} idCarro={idCarro} />
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default FormInfoCart;

// <main classNameNameName="flex flex-col items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-blue-300/30">
// <span classNameNameName="text-xl font-semibold">
// El servicio cuenta con {carros.length ? carros.length : "..."} Carros de
// paro
// </span>

// <div classNameNameName="grid grid-cols-1 gap-4 lg:grid-cols-2 items-center mx-auto mt-5">
// {carros.map((carro) => (
//     <div
//     key={carro.id}
//     classNameNameName="min-w-xl p-6 mb-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
//     >
//     <h5 classNameNameName="mb-2 text-2xl font-bold border-b-2 border-slate-400 tracking-tight text-gray-900 dark:text-white">
//         Información del Carro
//     </h5>

//     <div classNameNameName="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
//         <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
//         Número de Carro:
//         </p>
//         <p>{carro.numCarro}</p>
//     </div>

//     <div classNameNameName="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
//         <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
//         Fecha Inicio:
//         </p>
//         {carro.fechaInicio
//         ? new Date(
//             carro.fechaInicio.seconds * 1000
//             ).toLocaleDateString()
//         : ""}
//     </div>

//     <div classNameNameName="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
//         <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
//         Precinto Medicación:
//         </p>
//         <p>{carro.precintoMedicacion}</p>
//     </div>

//     <div classNameNameName="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
//         <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
//         Precinto Descartable:
//         </p>
//         <p>{carro.precintoDescartable}</p>
//     </div>

//     <div classNameNameName="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
//         <p classNameNameName="mb-3 font-normal text-gray-700 dark:text-gray-400">
//         Fecha Último Control:
//         </p>
//         <p>
//         {carro.fechaUltimoControl
//             ? new Date(
//                 carro.fechaUltimoControl.seconds * 1000
//             ).toLocaleDateString()
//             : ""}
//         </p>
//     </div>

//     <div classNameNameName="flex items-center justify-between gap-4">
//         <button
//         classNameNameName="inline-flex items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         onClick={() => handleViewDetailsCar(carro.id)}
//         >
//         Ver Detalle
//         <EyeIcon />
//         </button>
//         <button
//         classNameNameName="inline-flex items-center px-3 m-2 gap-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         onClick={() => handleEdit(carro)}
//         >
//         Editar
//         <IconEdit />
//         </button>
//     </div>

//     <ModalCarro
//         selectedCarros={selectedCarros}
//         isModalOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//     />
//     </div>
// ))}
// </div>

// {/* aqui tiene que ir la tabla de medicacion y material descartable   */}
// {showTable ? <MedicacionList medicacionList={medications} /> : ""}
// </main>
