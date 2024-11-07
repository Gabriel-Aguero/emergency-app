/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalCarro from "./ModalCarro";
import { EyeIcon, IconEdit } from "../components/icons/Icons";

const FormInfoCart = () => {
  const { carros, getCarrosByServicio } = useContext(AuthContext);

  const location = useLocation();
  const { serviceName } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  const navigate = useNavigate();

  // ordeno los carros por fecha de creacion 
  const sortedCarros = [...carros].sort((a, b) => a.fechaInicio.localeCompare(b.fechaInicio));

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setIsModalOpen(true);
    setSelectedCarros(carro);
  };

  const recuperarCarrosPorServicio = async () => {
    await getCarrosByServicio(serviceName);
  };

  useEffect(() => {
    recuperarCarrosPorServicio();
  }, []);

  const handleViewDetails = async (idCarro) => {
    // activo el spinner
    navigate("/elementos_del_carro", { state: { idCarro: idCarro } });
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mx-auto mt-5">
        {sortedCarros.map((carro) => (
            <div
              key={carro.id}
              className="min-w-xl p-6 mb-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold border-b-2 border-slate-400 tracking-tight text-gray-900 dark:text-white pb-2">
              Información del Carro 
            </h5>

            <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Número de Carro:
              </p>
              <p>{carro.numCarro}</p>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Fecha Inicio:
              </p>
              {carro.fechaInicio}
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Precinto Sección Medicación:
              </p>
              <p>{carro.precintoMedicacion}</p>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Precinto Sección Descartable:
              </p>
              <p>{carro.precintoDescartable}</p>
            </div>

            <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Fecha Último Control:
              </p>
              <p>{carro.fechaUltimoControl}</p>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                className="inline-flex items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                  handleViewDetails(carro.id)
                }
              >
                Lista de medicación
                <EyeIcon />
              </button>
              <button
                className="inline-flex items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() =>
                  handleEdit(carro)
                }
              >
                Editar 
                <IconEdit />
              </button>
            </div>
            </div>
        ))}
      </div>
      {/* aqui tiene que ir la tabla de medicacion y material descartable   */}
      <ModalCarro
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCarros={selectedCarros}
      />
    </main>
  );
};

export default FormInfoCart;
