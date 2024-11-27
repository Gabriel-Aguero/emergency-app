/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalCarro from "./ModalCarro";
import { EyeIcon, IconEdit } from "../components/icons/Icons";

const FormInfoCart = ({ servicioName: propServicioName }) => {
  const { carros, getCarrosByServicio, user } = useContext(AuthContext);
  const location = useLocation();

  const serviceName = propServicioName || location.state?.serviceName;
  // const { serviceName } = location.state || {};
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ordeno los carros por fecha de creacion
  const sortedCarros = [...carros].sort((a, b) =>
    a.fechaInicio.localeCompare(b.fechaInicio)
  );

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setSelectedCarros(carro);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCarros(null);
  };

  const recuperarCarrosPorServicio = async () => {
    await getCarrosByServicio(serviceName);
  };

  useEffect(() => {   
   
    if (serviceName) {
      setLoading(true);
      getCarrosByServicio(serviceName);
      setTimeout(() => {
        setLoading(false);
      }, 1000);      
    }

  }, [serviceName]);

  const handleViewDetails = async (idCarro) => {
    console.log(idCarro);
    // activo el spinner
    navigate("/elementos_del_carro", {
      state: { idCarro: idCarro, servicioName: serviceName },
    });
  };

  return (
    <> {
        loading ? (
          <div className="flex justify-center items-center mt-20 mx-auto">
            <span className="loader"></span>
          </div>
        ) : (
          <>
          {carros.length > 0 ? (
          <main className="flex flex-col items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 bg-blue-300/30 min-h-screen">
            <p className="text-2xl font-semibold mb-2">
              Servicio:{" "}
              <span className="text-orange-600 font-bold capitalize">
                {serviceName}
              </span>
            </p>
            <span className="text-xl font-semibold">
              Se han registrado {carros.length ? carros.length : "..."} Carros de
              paro{" "}
            </span>

            {user ? (
              <Link
                to="/formulario_de_datos"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Registrar un nuevo carro de paro
              </Link>
            ) : (
              <></>
            )}

            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 mx-auto mt-5">
              {sortedCarros.map((carro) => (
                <div
                  key={carro.id}
                  className="min-w-xl p-6 mb-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
                >
                  <h5 className="mb-2 text-xl font-bold border-b-2 border-slate-400 tracking-tight text-gray-900 dark:text-white pb-2">
                    Información del Carro
                  </h5>

                  <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Número de Carro:
                    </p>
                    <p>{carro.numCarro}</p>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Fecha Inicio:
                    </p>
                    {carro.fechaInicio}
                  </div>

                  <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Precinto Sección Medicación:
                    </p>
                    <p>{carro.precintoMedicacion}</p>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Precinto Sección Descartable:
                    </p>
                    <p>{carro.precintoDescartable}</p>
                  </div>

                  <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 mt-2">
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Fecha Último Control:
                    </p>
                    <p>{carro.fechaUltimoControl}</p>
                  </div>

                  <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                    <button
                      className="w-full inline-flex items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleViewDetails(carro.id)}
                    >
                      Ver contenido del carro
                      <EyeIcon />
                    </button>

                    {user ? (
                      <button
                        className="w-full flex justify-center items-center px-3 m-2 py-2 gap-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleEdit(carro)}
                      >
                        Editar
                        <IconEdit />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* aqui tiene que ir la tabla de medicacion y material descartable   */}
            {isEditModalOpen && selectedCarros && (
              <ModalCarro
                onClose={() => {
                  closeEditModal();
                  recuperarCarrosPorServicio();
                }}
                selectedCarros={selectedCarros}
              />
            )}
          </main>
          ) : (
            <div className="flex justify-center items-center gap-4 mx-auto mt-10">
              <h3 className="text-lg font-bold text-gray-900">
                {serviceName && 
                  <span>El servicio seleccionado no tiene carros de paro registrados</span> 
                }
              </h3>
            </div>
          )}
        </>
        )
       }     
              
    </>
  );
};

export default FormInfoCart;
