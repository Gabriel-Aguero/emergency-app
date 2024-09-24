import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconAlertWarning } from "../components/icons/Icons";
import { dataServicio } from "../context/sector";
import FormRegisterCart from "./FormRegisterCart";
import FormInfoCart from "./FormInfoCart";

const FormData = () => {
  const {
    user,
    logout,
    getUsuario,
    addCarro,
    usuario,
    carros,
    getCarrosByServicio,
  } = useContext(AuthContext);

  const [idCarro, setIdCarro] = useState(null);
  const navigate = useNavigate();

  // variables para el formulario de registro de carro de paro
  const [cartData, setCartData] = useState({
    numCarro: "",
    precintoMedicacion: "",
    precintoDescartable: "",
    fechaInicio: "",
    fechaUltimoControl: "",
    servicioName: "",
  });

  const [showFormCartDetails, setShowFormCartDetails] = useState(false);
  const [showListCart, setShowListCart] = useState(false);

  // Función para cerrar sesión
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Recupero los datos del usuario a traves del mail del usuario logeado
  const dataUsuario = async () => {
    const email = user.email;
    await getUsuario(email);
  };

  // Envio de datos del carro al back
  const cargarCarro = async () => {
    const id = await addCarro(cartData);
    setIdCarro(id);
    setCartData({
      ...cartData,
      numCarro: "",
      precintoMedicacion: "",
      precintoDescartable: "",
      cantidadCarros: "",
      servicioName: "",
      fechaInicio: "",
      fechaUltimoControl: "",
    });
    setShowListCart(false);
    setShowFormCartDetails(true);
  };

  // Capturo los datos del formulario de registro de carro de paro
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCartData({
      ...cartData,
      [name]: value,
    });
  };

  // Muestra el formulario para editar el carro seleccionado
  const handleViewCar = async () => {
    await getCarrosByServicio(usuario.servicioName);
    setShowFormCartDetails(false);
    setShowListCart(true);
  };

  useEffect(() => {
    if (user) {
      dataUsuario();
      navigate("/formulario_de_datos");
    }
  }, [user]);

  return (
    <>
      {user && (
        <section className="bg-white">
          <div className="flex flex-col lg:grid lg:min-h-screen lg:grid-cols-12">
            <main className="flex flex-col mt-16 items-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <div className="relative -mt-16 md:mt-0">
                  <a
                    className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                    href="/"
                  >
                    <span className="sr-only">Home</span>
                    <img
                      src="/logo.svg"
                      alt="logo"
                      className="h-auto rounded-full bg-slate-200"
                    />
                  </a>

                  <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl capitalize">
                    Bienvenido {usuario.firstName} {usuario.lastName}{" "}
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-500">
                    En este formulario podrás registrar la información sobre el
                    carro de paro.
                  </p>
                </div>

                <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                  {/* fecha de inicio  */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fechaInicio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de inicio
                    </label>

                    <input
                      type="date"
                      name="fechaInicio"
                      placeholder="Fecha de inicio"
                      value={cartData.fechaInicio}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  {/* servicio */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="servicioName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Servicio
                    </label>
                    <select
                      name="servicioName"
                      value={cartData.servicioName}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                      // onChange={(e) => setServicioName(e.target.value)}
                    >
                      <option value="">Seleccione un Servicio</option>
                      {dataServicio.map((servicio) => (
                        <option key={servicio.id} value={servicio.nombre}>
                          {servicio.nombre.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* numero de carro */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="numCarro"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Número de carro
                    </label>

                    <input
                      type="text"
                      name="numCarro"
                      value={cartData.numCarro}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  {/* precinto de medicacion */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="precinto"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Precinto sección medicación
                    </label>

                    <input
                      type="number"
                      name="precintoMedicacion"
                      placeholder="Número de Precinto"
                      value={cartData.precintoMedicacion}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  {/* precinto de descartable */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="precinto"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Precinto sección descartable
                    </label>

                    <input
                      type="number"
                      name="precintoDescartable"
                      placeholder="Número de Precinto"
                      value={cartData.precintoDescartable}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  {/* fecha de ultimo control */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="fecha_ultimo_control"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fecha de último control
                    </label>

                    <input
                      type="date"
                      name="fechaUltimoControl"
                      value={cartData.fechaUltimoControl || ""}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="cargarCarro" className="flex gap-4">
                      <IconAlertWarning />
                      <span className="text-sm text-gray-700">
                        Para continuar con el registro de información debes
                        guardar los datos del carro.
                      </span>
                    </label>
                  </div>

                  <div className="col-span-6 flex flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:gap-4">
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      type="button"
                      onClick={cargarCarro}
                    >
                      Guardar
                    </button>
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      type="button"
                      onClick={handleViewCar}
                    >
                      Ver carros registrados
                      {/* traigo los carros segun el servicio del usuario registrado. El servicio lo recupero como usuario.servicioName  */}
                    </button>
                    <button
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                      type="button"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </form>
              </div>
            </main>

            {!showFormCartDetails ? (
              <>
                {showListCart ? (
                  <FormInfoCart
                    serviceName={usuario.servicioName}
                    carros={carros}
                  />
                ) : (
                  <section className="relative flex h-96 items-end lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                      alt="imagen de carro"
                      src="./public/carroParo.svg"
                      className="absolute inset-20 top-px sm:top-0 sm:left-0 object-cover"
                    />
                  </section>
                )}
              </>
            ) : (
              <FormRegisterCart idCarro={idCarro} />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default FormData;
