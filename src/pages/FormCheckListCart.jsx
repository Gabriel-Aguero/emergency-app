import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IconDelete, IconEdit, EyeIcon } from "../components/icons/Icons";
import Modal from "./ModalCarro";
import { dataServicio } from "../context/sector";

const BuscarCarroPorServicio = () => {
  // const [showMedicacionList, setShowMedicacionList] = useState(false);
  const [servicioName, setServicioName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  const [viewCarros, setViewCarros] = useState(false);
  const [viewDetailsCarros, setViewDetailsCarros] = useState(false);
  const {
    getCarrosByServicio,
    carros,
    getMedicationByCarro,
    getDescartableByCarro,
    medications,
  } = useContext(AuthContext);

  useEffect(() => {
    if(carros.length > 0) {
      setViewCarros(true);     
    }
  }, [carros]);

  const verDetalleCarro = async (idCarro) => {
    try {
      await getDescartableByCarro(idCarro);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Muestra los carrros de paro por el servicio seleccionado
  const handleViewCar = async (servicioName) => {
    if (servicioName) {
    setViewCarros(false);
    await getCarrosByServicio(servicioName);      
    }
  };

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setIsModalOpen(true);
    setSelectedCarros(carro);
  };

  // Muestra el detalle del carro seleccionado, elementos descartables y medicaciones
  const handleViewDetailsCar = async (idCarro) => {
    setViewDetailsCarros(!viewDetailsCarros);
    await getMedicationByCarro(idCarro);
    console.log(idCarro);
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

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenido
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              En esta sección podrás buscar los carros de paro según el servicio que seleccione.
              Podrá visualizar la información general y el detalle de los mismos.
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
          {viewCarros ? (
            <div className="flex flex-col justify-start items-start">
              <div className="flex flex-col text-right gap-2 mt-5 shadow-sm bg-white text-whiten">
                <span>
                  El servicio cuenta con {carros.length ? carros.length : "..."}{" "}
                  Carros de paro
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-center mx-auto mt-5">
                {carros.map((carro) => (
                  <div
                    key={carro.id}
                    className="min-w-xl p-6 mb-5 flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  >
                    <h5 className="mb-2 text-2xl font-bold border-b-2 border-slate-400 tracking-tight text-gray-900 dark:text-white">
                      Información del Carro
                    </h5>

                    <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700 p-2">
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Número de Carro:
                      </p>
                      <p>{carro.numCarro}</p>
                    </div>

                    <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Número de Precinto:
                      </p>
                      <p>{carro.precinto}</p>
                    </div>

                    <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Fecha Inicio:
                      </p>
                      {carro.fechaInicio
                        ? new Date(
                            carro.fechaInicio.seconds * 1000
                          ).toLocaleDateString()
                        : ""}
                    </div>

                    <div className="flex justify-between gap-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Fecha Último Control:
                      </p>
                      <p>
                        {carro.fechaUltimoControl
                          ? new Date(
                              carro.fechaUltimoControl.seconds * 1000
                            ).toLocaleDateString()
                          : ""}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4 mt-10">
              <h3 className="text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">El servicio seleccionado no tiene carros de paro registrados</h3>
            </div> 
            )
        }

          <Modal
            selectedCarros={selectedCarros}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
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
        ) : (
          <aside className="relative block h-96 lg:col-span-5 lg:h-[80%] m-10 xl:col-span-6">
            <MedicacionList medicacionList={medications} />
          </aside>
        )}
      </div>
    </section>
  );
};

export default BuscarCarroPorServicio;

{
  /* <div className="shadow-md sm:rounded-lg mt-20 ">
            <table className="max-w-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Número de Carro
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Precinto Registrado
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha Inicio
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha Último Control
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {carros.map((carro) => (
                  <tr
                    key={carro.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {carro.numCarro}
                    </th>
                    <td className="px-6 py-4">{carro.precinto}</td>
                    <td className="px-6 py-4">
                      {carro.fechaInicio
                        ? new Date(
                            carro.fechaInicio.seconds * 1000
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-6 py-4">
                      {carro.fechaUltimoControl
                        ? new Date(
                            carro.fechaInicio.seconds * 1000
                          ).toLocaleDateString()
                        : ""}
                    </td>

                    <td className="flex items-center px-4 py-4">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(carro)}
                      >
                        Editar
                      </button>
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                      onClick={() => handleView(carro)}>
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */
}
