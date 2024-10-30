/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import { EyeIcon, IconEdit, IconInfo } from "../components/icons/Icons";
import ModalCarro from "./ModalCarro";
import { SpinnerDiamond } from "spinners-react";

const FormInfoCart = () => {
  const {
    medications,
    getMedicationByCarro,
    descartables,
    getDescartableByCarro,
    carros,
    getCarrosByServicio,
  } = useContext(AuthContext);

  const location = useLocation();
  const { serviceName } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  const [showTable, setShowTable] = useState(false);
  const [idCarro, setIdCarro] = useState(null);
  const [loading, setLoading] = useState(false);

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setIsModalOpen(true);
    setSelectedCarros(carro);
  };   

  const recuperarCarrosPorServicio = async () => {
    await getCarrosByServicio(serviceName);
  };

  useEffect( () => {
    recuperarCarrosPorServicio();
  }, []);

  const handleViewDetailsCar = async (idCarro) => {
    setLoading(true);
    setIdCarro(idCarro);
    setShowTable(true);
    await getMedicationByCarro(idCarro);
    await getDescartableByCarro(idCarro);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-blue-300/30 min-h-screen">
      <p className="text-2xl font-semibold mb-2">
        Servicio:{" "}
        <span className="text-orange-600 font-bold capitalize">
          {serviceName}
        </span>
      </p>
      <span className="text-xl font-semibold">
        Se han registrado {carros.length ? carros.length : "..."} Carros de paro{" "}
      </span>
      <div className="mb-6 mt-5 flex flex-col md:flex md:flex-row gap-4 ">
        {carros.map((carro) => (
         
         <article className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <div className="flex items-center gap-4">
            <img
              alt=""
              src="/carts.svg"
              className="size-16 object-cover"
            />

            <div>
              <h3 className="text-lg font-medium text-white">Número de Carro: {carro.numCarro}</h3>

              <div className="flow-root mt-2">
                  <ul className="-m-1 flex flex-wrap justify-between gap-2">
                    <li className="p-1 leading-none">
                      <button href="#" className="text-md font-medium text-orange-300" onClick={ () => handleViewDetailsCar(carro.id) }> Ver detalle </button>
                    </li>

                    <li className="p-1 leading-none">
                    <button href="#" className="text-md font-medium text-orange-300" onClick={ () => handleEdit(carro) }> Editar </button>
                    </li>
                    
                  </ul>
              </div>
            </div>
          </div>

          <ul className="mt-4 space-y-2">
            <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-cyan-600">
                  <strong className="font-medium text-white">Fecha de Inicio</strong>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {carro.fechaInicio}
                  </p>
                </a>
            </li>
            
            <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-cyan-600">
                  <strong className="font-medium text-white">Precinto Medicación</strong>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {carro.precintoMedicacion}
                  </p>
                </a>
            </li>

            <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-cyan-600">
                  <strong className="font-medium text-white">Precinto Descartable</strong>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {carro.precintoDescartable}
                  </p>
                </a>
            </li>
            
            <li>
                <a href="#" className="block h-full rounded-lg border border-gray-700 p-4 hover:border-cyan-600">
                  <strong className="font-medium text-white">Fecha Último Control</strong>

                  <p className="mt-1 text-xs font-medium text-gray-300">
                    {carro.fechaUltimoControl}
                  </p>
                </a>
            </li>
          </ul>
         </article>
        ))}
      </div>
      {/* aqui tiene que ir la tabla de medicacion y material descartable   */}
      { loading ? (
        <div className="flex justify-center items-center mt-20 m-20">
          <SpinnerDiamond
            size={150}
            thickness={100}
            speed={200}
            color="#09f"
            secondaryColor="rgba(0, 0, 0, 0.44)"
          />
        </div>
        ) : showTable ? (
          <>
            <MedicacionList medicacionList={medications} idCarro={idCarro} />
            <DescartableList descartablesList={descartables} idCarro={idCarro} />
          </>
        ) : (
        ""
        )          
      }
      <ModalCarro 
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCarros={selectedCarros}
      />
    </main>
  );
};

export default FormInfoCart;

{/* <button
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
            </button> */}