/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ModalCarro from "./ModalCarro";

const FormInfoCart = () => {
  const {        
    carros,
    getCarrosByServicio,
  } = useContext(AuthContext);

  const location = useLocation();
  const { serviceName } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();      
  const navigate = useNavigate();

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
    // activo el spinner         
    navigate("/contenido_del_carro", {state: {idCarro: idCarro}});    
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
         
         <article key={carro.id} className="rounded-xl border border-gray-700 bg-gray-800 p-6">
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
      <ModalCarro 
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCarros={selectedCarros}
      />
    </main>
  );
};

export default FormInfoCart;

