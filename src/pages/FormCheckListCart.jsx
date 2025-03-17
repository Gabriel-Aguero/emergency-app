/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { dataServicio } from "../context/sector";

const BuscarCarroPorServicio = () => {
  const [servicioName, setServicioName] = useState("");
  const { getCarrosByServicio, carros } = useContext(AuthContext);
  const navigate = useNavigate();

  const getCarros = async () => {
    await getCarrosByServicio(servicioName);
    setTimeout(() => {}, 1000);
  };

  const handleViewDetails = (idCarro) => {
    navigate(`/elementos_del_carro/${idCarro}`);
  };

  // ordeno los servicios alfabeticamente
  const sortedServicios = [...dataServicio].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  useEffect(() => {
    if (servicioName) {
      getCarrosByServicio(servicioName);
    }
  }, [servicioName, getCarrosByServicio]);

  return (
    <section className="bg-white min-h-screen">
      <div className="flex  justify-center lg:min-h-screen">
        <main className="flex flex-col items-start px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="flex flex-col items-center justify-center max-w-xl lg:max-w-3xl">
            <Link to="/" className="block text-blue-600">
              <span className="sr-only">Home</span>
              <img src="/bienvenido.svg" alt="Logo" className="h-40 sm:h-52" />
            </Link>

            <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Verifica tu carro de paro
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              En esta sección podrás buscar los carros de paro según el servicio
              que seleccione. Podrá visualizar la información general y el
              detalle de los mismos.
            </p>

            <form
              action="#"
              className="mt-8 flex justify-start items-start p-4"
            >
              <div className="flex justify-start items-start gap-2 w-full">
                <select
                  id="servicio"
                  value={servicioName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setServicioName(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Seleccione un Servicio
                  </option>
                  {sortedServicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.nombre}>
                      {servicio.nombre.toUpperCase()}
                    </option>
                  ))}
                </select>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden"
                  type="button"
                  onClick={getCarros}
                >
                  Buscar
                </button>
              </div>
            </form>

            {servicioName && carros.length > 0 ? (
              <div className="w-full mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Carros en {servicioName}
                </h2>
                <ul className="space-y-4">
                  {carros.map((carro) => (
                    <li
                      key={carro.id}
                      className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between gap-2 font-bold"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        # {carro.numCarro}
                      </h3>
                      <p className="text-md text-gray-600">
                        Fecha Inicio: {carro.fechaInicio}
                      </p>
                      <p className="text-md text-gray-600">
                        Precinto Medicación: {carro.precintoMedicacion}
                      </p>
                      <p className="text-md text-gray-600">
                        Precinto Descartable: {carro.precintoDescartable}
                      </p>
                      <p className="text-md text-gray-600">
                        Fecha de último control: {carro.fechaUltimoControl}
                      </p>
                      <button
                        className="mt-2 inline-block text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewDetails(carro.id)}
                      >
                        Ver detalles →
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : servicioName && carros.length === 0 ? (
              <p className="mt-8 text-gray-600 text-xl">
                No hay carros registrados en este servicio.
              </p>
            ) : null}
          </div>
        </main>
      </div>
    </section>
  );
};

export default BuscarCarroPorServicio;
