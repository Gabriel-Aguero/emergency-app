import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import { Link } from "react-router-dom";
import { EyeIcon } from "../components/icons/Icons";
import { dataServicio } from "../context/sector";
import { SpinnerDiamond } from "spinners-react";
import DescartableList from "./DescartableList";

const BuscarCarroPorServicio = () => {
  // const [showMedicacionList, setShowMedicacionList] = useState(false);
  const [servicioName, setServicioName] = useState("");
  const [viewCarros, setViewCarros] = useState(false);
  const [viewDetailsCarros, setViewDetailsCarros] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    getCarrosByServicio,
    carros,
    getMedicationByCarro,
    getDescartableByCarro,
    medications,
    descartables,
  } = useContext(AuthContext);

  useEffect(() => {
    setViewCarros(false);
    if (carros.length > 0) {
      setViewCarros(true);
    }
  }, [carros]);

  // const verDetalleCarro = async (idCarro) => {
  //   try {
  //     await getDescartableByCarro(idCarro);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // Muestra los carrros de paro por el servicio seleccionado
  const handleViewCar = async (servicioName) => {
    // aqui poner el spinner
    if (servicioName) {
      setLoading(true);
      setViewCarros(false);
      await getCarrosByServicio(servicioName);
      setLoading(false);
      setViewDetailsCarros(false);
    }
  };

  // Muestra el detalle del carro seleccionado, elementos descartables y medicaciones
  const handleViewDetailsCar = async (idCarro) => {
    setViewDetailsCarros(true);
    setLoading(true);
    await getMedicationByCarro(idCarro);
    await getDescartableByCarro(idCarro);
    setLoading(false);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex flex-col items-start px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link to="/" className="block text-blue-600">
              <span className="sr-only">Home</span>
              <img
                src="/public/bienvenido.svg"
                alt="Logo"
                className="h-40 sm:h-52"
              />
            </Link>

            <h1 className="mt-6 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenido
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              En esta sección podrás buscar los carros de paro según el servicio
              que seleccione. Podrá visualizar la información general y el
              detalle de los mismos.
            </p>

            <form action="#" className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3 flex">
                <select
                  id="servicio"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setServicioName(e.target.value)}
                >
                  <option value="">Seleccione un Servicio</option>
                  {dataServicio.map((servicio) => (
                    <option key={servicio.id} value={servicio.nombre}>
                      {servicio.nombre.toUpperCase()}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="bg-blue-700 text-white flex font-bold py-2 px-6 mx-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => handleViewCar(servicioName)}
                >
                  {" "}
                  Ir
                </button>
              </div>
            </form>
          </div>

          {/* los carros de paro se muestran al ejecutar el boton ir  */}
          {loading ? (
            <div className="flex justify-center items-center mt-20 m-20">
              <SpinnerDiamond
                size={150}
                thickness={100}
                speed={200}
                color="#09f"
                secondaryColor="rgba(0, 0, 0, 0.44)"
              />
            </div>
          ) : (
            <>
              {viewCarros ? (
                <div className="flex flex-col justify-start items-start mx-auto">
                  <div className="flex flex-col text-right gap-2 mt-5 shadow-sm bg-white text-whiten">
                    <span>
                      El servicio cuenta con{" "}
                      {carros.length ? carros.length : "..."} Carros de paro
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mx-auto mt-5">
                    {carros.map((carro) => (
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
                            onClick={() => handleViewDetailsCar(carro.id)}
                          >
                            Ver Detalle
                            <EyeIcon />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center gap-4 mt-10">
                  <h3 className="text-lg font-bold text-gray-900">
                    El servicio seleccionado no tiene carros de paro registrados
                  </h3>
                </div>
              )}
            </>
          )}
        </main>

        {/* esta seccion seria para visualizar el detalle del carro, se muestra cuando el usuario ha seleccionado un carro  */}
        {!viewDetailsCarros ? (
          <aside className="relative block h-96 lg:col-span-5 lg:h-[80%] m-10 xl:col-span-6">
            <img
              alt=""
              src="/public/task.svg"
              className="absolute inset-0 object-cover"
            />
          </aside>
        ) : loading ? (
          <div className="flex justify-center items-center mt-20 m-20">
            <SpinnerDiamond
              size={150}
              thickness={100}
              speed={200}
              color="#09f"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
          </div>
        ) : (
          <>
            <aside className="relative block h-screen lg:col-span-5 lg:h-[80%] m-1 xl:col-span-6">
              <MedicacionList medicacionList={medications} />
              <DescartableList descartablesList={descartables} />
            </aside>
          </>
        )}
      </div>
    </section>
  );
};

export default BuscarCarroPorServicio;
