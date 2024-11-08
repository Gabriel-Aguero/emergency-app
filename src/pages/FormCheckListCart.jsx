/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { dataServicio } from "../context/sector";
import { SpinnerDiamond } from "spinners-react";
import FormInfoCart from "./FormInfoCart";

const BuscarCarroPorServicio = () => {
  const [servicioName, setServicioName] = useState("");
  const [viewCarros, setViewCarros] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getCarrosByServicio } = useContext(AuthContext);

  useEffect(() => {
    if (servicioName) {
      // quiero mostrar el spinner antess de loss datos
      setLoading(true);
      setTimeout(() => {
        setViewCarros(!viewCarros);
        getCarrosByServicio(servicioName);
        setLoading(false);
      }, 1000);
    }
  }, [servicioName]);

  // ordeno los servicios alfabeticamente
  const sortedServicios = [...dataServicio].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <section className="bg-white">
      <div className="flex items-center justify-center lg:min-h-screen">
        <main className="flex flex-col items-start px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="flex flex-col items-center justify-center max-w-xl lg:max-w-3xl">
            <Link to="/" className="block text-blue-600">
              <span className="sr-only">Home</span>
              <img src="/bienvenido.svg" alt="Logo" className="h-40 sm:h-52" />
            </Link>

            <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenido
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setServicioName(e.target.value)}
                >
                  <option value="" disabled>
                    Seleccione un Servicio
                  </option>
                  {sortedServicios.map((servicio) => (
                    <option key={servicio.id} value={servicio.nombre}>
                      {servicio.nombre.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          {/* los carros de paro se muestran al ejecutar el boton ir  */}

          {loading ? (
            <div className="flex justify-center items-center mt-20 mx-auto">
              <SpinnerDiamond
                size={150}
                thickness={100}
                speed={200}
                color="#09f"
                secondaryColor="rgba(0, 0, 0, 0.44)"
              />
            </div>
          ) : (
            <FormInfoCart servioName={servicioName} />
          )}
        </main>
      </div>
    </section>
  );
};

export default BuscarCarroPorServicio;
