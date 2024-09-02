import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CheckSquareIcon } from "../components/icons/Icons";

const FormData = () => {
  const {
    user,
    logout,
    getUsuario,
    addCarro,
    usuario,
    addMedication,
    addDescartable,
  } = useContext(AuthContext);

  const [idCarro, setIdCarro] = useState(null);
  const navigate = useNavigate();

  // variables para el formulario de registro de carro de paro
  const [cartData, setCartData] = useState({
    numCarro: "",
    precinto: "",
    cantidadCarros: "",
    fechaInicio: "",
    fechaUltimoControl: "",
    servicioName: "",
  });

  // variables para el formulario de medicación
  const [medicationData, setMedicationData] = useState({
    idCarro: "",
    medication: "",
    lot: "",
    medExpiration: "",
    medQuantity: "",
  });

  // variables para el formulario de descartable
  const [material, setMaterial] = useState({
    idCarro: "",
    material: "",
    lot: "",
    matExpiration: "",
    matQuantity: "",
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
  const cargarCarro = async () => {
    const id = await addCarro(cartData);
    setIdCarro(id);
    setCartData({
      ...cartData,
      numCarro: "",
      precinto: "",
      cantidadCarros: "",
      fechaInicio: "",
      fechaUltimoControl: "",
    });
  };

  // Envio de datos al back de medicación y material descartable
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMedication(medicationData);
    await addDescartable(material);

    setMedicationData({
      idCarro: "",
      medication: "",
      lot: "",
      medExpiration: "",
      medQuantity: "",
    });

    setMaterial({
      idCarro: "",
      material: "",
      lot: "",
      matExpiration: "",
      matQuantity: "",
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

  // Capturo los datos del formulario de medicación
  const handleChangeMed = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicationData({
      ...medicationData,
      idCarro: idCarro,
      [name]: value,
    });
  };

  // Capturo los datos del formulario de material descartable
  const handleChangeMat = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMaterial({
      ...material,
      idCarro: idCarro,
      [name]: value,
    });
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
        <div className="flex flex-col items-center justify-center mx-auto p-4 min-h-screen max-w-2xl">
          <div className="flex flex-col justify-center items-center gap-4">
            <span className="text-2xl text-center font-bold text-[#09f] mt-4">
              Usuario: {user.email}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Completa la información {usuario.firstName}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 p-2 rounded-lg shadow-2xl shadow-slate-700 w-full bg-slate-800/90"
          >
            {/*------------ Formulario de registro de carro de paro ------------*/}
            <div className="mb-2 p-6 bg-slate-800">
              <h3 className="text-xl font-semibold text-white mb-10">
                Información del Carro de Paro
              </h3>

              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
                <div className="relative flex flex-col">
                  <label
                    htmlFor="fechaInicio"
                    className="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Fecha
                  </label>
                  <input
                    type="date"
                    name="fechaInicio"
                    placeholder="Fecha de inicio"
                    value={cartData.fechaInicio}
                    onChange={handleChange}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="servicioName"
                    className="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Servicio
                  </label>
                  <input
                    type="text"
                    name="servicioName"
                    placeholder="Unidad Funcional"
                    value={cartData.servicioName}
                    onChange={handleChange}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="numCarro"
                    className="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Número de carro
                  </label>
                  <input
                    type="text"
                    name="numCarro"
                    placeholder="Identificación del carro"
                    value={cartData.numCarro}
                    onChange={handleChange}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="precinto"
                    className="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Número de Precinto
                  </label>
                  <input
                    type="number"
                    name="precinto"
                    placeholder="Precinto colocado"
                    value={cartData.precinto}
                    onChange={handleChange}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="fecha_ultimo_control"
                    className="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Fecha de último control
                  </label>
                  <input
                    type="date"
                    name="fechaUltimoControl"
                    value={cartData.fechaUltimoControl}
                    onChange={handleChange}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  type="button"
                  onClick={cargarCarro}
                  className="flex items-center justify-center w-12 h-12 bg-green-500 text-white border-2
                     border-green-600 rounded-full hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  <CheckSquareIcon className="w-6 h-6" fill="white" />
                </button>
              </div>
            </div>
            {/* ----------------------------------------------------------------- */}

            {/* ---------------- Formulario de medicación ----------------------*/}
            <div className="mb-2 p-6 bg-slate-800">
              <h3 className="text-xl font-semibold text-white mb-10">
                Medicación
              </h3>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="carroId"
                  placeholder="carroId"
                  value={idCarro ? idCarro : ""}
                  onChange={handleChangeMed}
                  readOnly
                  className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white hidden mt-2"
                />

                <div className="relative flex flex-col">
                  <label
                    htmlFor="medication"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Medicación
                  </label>
                  <input
                    type="text"
                    name="medication"
                    value={medicationData.medication}
                    onChange={handleChangeMed}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="lot"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Lote
                  </label>
                  <input
                    type="text"
                    name="lot"
                    value={medicationData.lot}
                    onChange={handleChangeMed}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="medExpiration"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    name="medExpiration"
                    value={medicationData.medExpiration}
                    onChange={handleChangeMed}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="medQuantity"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="medQuantity"
                    value={medicationData.medQuantity}
                    onChange={handleChangeMed}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------------------------------* */}

            {/* --------------------- Formulario de descartables -----------------------------   */}
            <div className="mb-2 p-6 bg-slate-800">
              <h3 className="text-xl font-semibold text-white mb-8">
                Material Descartable
              </h3>
              <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="idCarro"
                  placeholder="idCarro"
                  value={idCarro ? idCarro : ""}
                  onChange={handleChangeMat}
                  readOnly
                  className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white hidden"
                />

                <div className="relative flex flex-col">
                  <label
                    htmlFor="material"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Descripción
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={material.material}
                    onChange={handleChangeMat}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="lot"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Lote
                  </label>
                  <input
                    type="text"
                    name="lot"
                    value={material.lot}
                    onChange={handleChangeMat}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="matExpiration"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="date"
                    name="matExpiration"
                    value={material.matExpiration}
                    onChange={handleChangeMat}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>

                <div className="relative flex flex-col">
                  <label
                    htmlFor="matQuantity"
                    className="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
                    transform -translate-y-5 text-md"
                  >
                    Cantidad
                  </label>
                  <input
                    type="number"
                    name="matQuantity"
                    value={material.matQuantity}
                    onChange={handleChangeMat}
                    className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
                  />
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------- */}

            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="w-36 bg-[#09f] text-white font-bold rounded-md p-2 hover:bg-blue-600 transition duration-200"
              >
                Enviar
              </button>
              <button
                onClick={handleLogout}
                className="w-36 bg-[#ff5b5c] text-white font-bold rounded-md p-2 hover:bg-red-700 transition duration-200"
              >
                Cerrar sesión
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FormData;
