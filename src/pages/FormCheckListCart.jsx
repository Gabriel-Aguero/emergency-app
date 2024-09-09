import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IconDelete, IconEdit, EyeIcon } from "../components/icons/Icons";
import Modal from "./ModalCarro";

const BuscarCarroPorServicio = () => {
  // const [showMedicacionList, setShowMedicacionList] = useState(false);
  const [servicioName, setServicioName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarros, setSelectedCarros] = useState();
  // const [viewCarros, setViewCarros] = useState(false);
  const [viewDetailsCarros, setViewDetailsCarros] = useState(false);
  const {
    getCarrosByServicio,
    carros,
    getMedicationByCarro,
    getDescartableByCarro,
    medications,
  } = useContext(AuthContext);

  // const [listCarro, setListCarro] = useState(carros);

  useEffect(() => {
    // setShowMedicacionList(false);
  }, []);

  const verDetalleCarro = async (idCarro) => {
    try {
      
      await getDescartableByCarro(idCarro);      
    } catch (error) {
      console.log(error.message);
    }
  };

  // Muestra los carrros de paro por el servicio seleccionado
  const handleViewCar = async (servicioName) => {
    await getCarrosByServicio(servicioName);
  };

  // Muestra el formulario para editar el carro seleccionado
  const handleEdit = (carro) => {
    setIsModalOpen(true);
    setSelectedCarros(carro);
  };

  // // Función para actualizar el carro en la lista de carros después de realizar cambios en el modal
  // const handleUpdateCarro = (updatedCarro) => {
  //   const updatedCarros = listCarro.map((carro) =>
  //     carro.id === updatedCarro.id ? updatedCarro : carro
  //   );
  //   setListCarro(updatedCarros); // Actualiza la lista de carros con el carro editado
  // };

  // Muestra el detalle del carro seleccionado, elementos descartables y medicaciones
  const handleViewDetailsCar = async (idCarro) => {
    setViewDetailsCarros(!viewDetailsCarros);        
    await getMedicationByCarro(idCarro);
    console.log(idCarro);
  };

  const dataServicio = [
    { id: 1, nombre: "sistemas" },
    { id: 2, nombre: "Servicio 2" },
    { id: 3, nombre: "Servicio 3" },
    { id: 4, nombre: "Servicio 4" },
    { id: 5, nombre: "Servicio 5" },
  ];

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex flex-col items-start justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link to="/" className="block text-blue-600">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenido 🦑
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              En esta sección podrás buscar los carros según el servicio que
              quieras. Podrá visualizar la información general de los carros, y
              detalles del mismo.
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
          {servicioName && (
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
          )}

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
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
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
  /* tabla para mostrar los datos del carro */
}
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
