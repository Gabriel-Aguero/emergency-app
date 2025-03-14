import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconAlertWarning } from "../components/icons/Icons";
import { dataServicio } from "../context/sector";
import Swal from "sweetalert2";

const FormData = () => {
  const { user, logout, getUsuario, addCarro, usuario } =
    useContext(AuthContext);

  // const [idCarro, setIdCarro] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString();

  // variables para el formulario de registro de carro de paro
  const [cartData, setCartData] = useState({
    numCarro: "",
    precintoMedicacion: "",
    precintoDescartable: "",
    fechaInicio: "",
    fechaUltimoControl: today || "",
    servicioName: "",
  });

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
  const cargarCarro = async (e) => {
    e.preventDefault();
    await addCarro(cartData);
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "El carro se ha registrado correctamente",
      text: "Ve a los carros registrados para agregar información del contenido",
      showConfirmButton: false,
      timer: 3000,
    });

    // limpiar los datos del formulario
    setCartData({
      numCarro: "",
      precintoMedicacion: "",
      precintoDescartable: "",
      fechaInicio: "",
      fechaUltimoControl: today || "",
      servicioName: "",
    });
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

  // Muestra el detalle de los carros registrados
  const handleViewCar = async () => {
    navigate("/info_cart", { state: { serviceName: usuario.servicioName } });
  };

  // ordeno los servicios alfabeticamente
  const sortedServicios = [...dataServicio].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  useEffect(() => {   
    setLoading(true);
    dataUsuario();
    setTimeout(() => {
      if (user) {
        setLoading(false);
        navigate("/formulario_de_datos");
      }
    }, 1000);
  }, [user]);

  return (
    <>
      {user && (
        <section className="bg-white">          
          <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto p-8 border-2 border-gray-700-600 shadow-lg rounded-lg">
              {loading ? (
                <div className="flex justify-center items-center mt-20 m-20">
                  <span className="loader"></span>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 items-center justify-center">
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
                      En este formulario podrás registrar la información sobre
                      el carro de paro.
                    </p>
                  </div>
                  <form
                    action="#"
                    className="mt-8 grid grid-cols-2 gap-6 border-2 border-gray-700-600 shadow-lg rounded-lg p-4"
                    onSubmit={cargarCarro}
                  >

                    <div className="col-span-2 border-2 border-gray-800 p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <label htmlFor="cargarCarro" className="flex gap-4">
                          <IconAlertWarning />
                          <span className="text-sm text-gray-700">
                            Para continuar con el registro de información debes
                            guardar los datos del carro.
                          </span>
                        </label>
                      </div>
                    </div>    
                    {/* fecha de inicio  */}
                    <div className="col-span-2 md:col-span-1">
                     <div className="flex flex-col gap-4">
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
                        required
                      />
                     </div>
                    </div>

                    {/* servicio */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col gap-4">
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
                          required
                          // onChange={(e) => setServicioName(e.target.value)}
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
                    </div>

                    {/* numero de carro */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col gap-4">
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
                          required
                        />
                      </div>
                    </div>

                    {/* precinto de medicacion */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col gap-4">
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
                          required
                        />
                      </div>
                    </div>

                    {/* precinto de descartable */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col gap-4">
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
                          required
                        />
                      </div>
                    </div>

                    {/* fecha de ultimo control */}
                    <div className="col-span-2 md:col-span-1">
                      <div className="flex flex-col gap-4">
                        <label
                          htmlFor="fecha_ultimo_control"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Fecha de último control
                        </label>

                        <input
                          type="text"
                          name="fechaUltimoControl"
                          placeholder={today}
                          // value={cartData.fechaUltimoControl}
                          onChange={handleChange}
                          className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                          required
                          readOnly
                        />
                      </div>
                    </div>                   

                    <div className="col-span-2">
                      <div className="col-span-6 flex flex-col gap-4 sm:flex sm:flex-row sm:items-center sm:gap-4">
                        <button
                          className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                          type="submit"
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
                    </div>

                  </form>
                </>
              )}
            </div>
          </main>         
          
        </section>
      )}
    </>
  );
};

export default FormData;
