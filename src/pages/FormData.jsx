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
        <section className="bg-white">
          <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
              <div className="max-w-xl lg:max-w-3xl">
                <div className="relative -mt-16 block lg:hidden">
                  <a
                    className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                    href="#"
                  >
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
                  </a>

                  <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Welcome to Squid 🦑
                  </h1>

                  <p className="mt-4 leading-relaxed text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                  </p>
                </div>

                <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="FirstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      id="FirstName"
                      name="first_name"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="LastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      id="LastName"
                      name="last_name"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      for="Email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Email{" "}
                    </label>

                    <input
                      type="email"
                      id="Email"
                      name="email"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="Password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      {" "}
                      Password{" "}
                    </label>

                    <input
                      type="password"
                      id="Password"
                      name="password"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="PasswordConfirmation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password Confirmation
                    </label>

                    <input
                      type="password"
                      id="PasswordConfirmation"
                      name="password_confirmation"
                      className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6">
                    <label for="MarketingAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                      />

                      <span className="text-sm text-gray-700">
                        I want to receive emails about events, product updates
                        and company announcements.
                      </span>
                    </label>
                  </div>

                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      By creating an account, you agree to our
                      <a href="#" className="text-gray-700 underline">
                        {" "}
                        terms and conditions{" "}
                      </a>
                      and
                      <a href="#" className="text-gray-700 underline">
                        privacy policy
                      </a>
                      .
                    </p>
                  </div>

                  <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                      Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                      Already have an account?
                      <a href="#" className="text-gray-700 underline">
                        Log in
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            </main>

            <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />

              <div className="hidden lg:relative lg:block lg:p-12">
                <a className="block text-white" href="#">
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
                </a>

                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h2>

                <p className="mt-4 leading-relaxed text-white/90">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
                </p>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default FormData;

// <div classNameName="flex flex-col items-center justify-center mx-auto p-4 min-h-screen max-w-2xl">
// <div classNameName="flex flex-col justify-center items-center gap-4">
//   <span classNameName="text-2xl text-center font-bold text-[#09f] mt-4">
//     Usuario: {user.email}
//   </span>
//   <h2 classNameName="text-2xl font-bold text-slate-900 mb-4">
//     Completa la información {usuario.firstName}
//   </h2>
// </div>
// <form
//   onSubmit={handleSubmit}
//   classNameName="flex flex-col gap-6 p-2 rounded-lg shadow-2xl shadow-slate-700 w-full bg-slate-300"
// >
//   {/*------------ Formulario de registro de carro de paro ------------*/}
//   <div classNameName="mb-2 p-6 bg-slate-300">
//     <h3 classNameName="text-xl font-semibold text-white mb-10">
//       Información del Carro de Paro
//     </h3>

//     <div classNameName="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="fechaInicio"
//           classNameName="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Fecha
//         </label>
//         <input
//           type="date"
//           name="fechaInicio"
//           placeholder="Fecha de inicio"
//           value={cartData.fechaInicio}
//           onChange={handleChange}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="servicioName"
//           classNameName="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Servicio
//         </label>
//         <input
//           type="text"
//           name="servicioName"
//           placeholder="Unidad Funcional"
//           value={cartData.servicioName}
//           onChange={handleChange}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="numCarro"
//           classNameName="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Número de carro
//         </label>
//         <input
//           type="text"
//           name="numCarro"
//           placeholder="Identificación del carro"
//           value={cartData.numCarro}
//           onChange={handleChange}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="precinto"
//           classNameName="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Número de Precinto
//         </label>
//         <input
//           type="number"
//           name="precinto"
//           placeholder="Precinto colocado"
//           value={cartData.precinto}
//           onChange={handleChange}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="fecha_ultimo_control"
//           classNameName="absolute text-gray-300 transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Fecha de último control
//         </label>
//         <input
//           type="date"
//           name="fechaUltimoControl"
//           value={cartData.fechaUltimoControl}
//           onChange={handleChange}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>
//     </div>

//     <div classNameName="flex items-center justify-center gap-4 mt-5">
//       <button
//         type="button"
//         onClick={cargarCarro}
//         classNameName="flex items-center justify-center w-12 h-12 bg-green-500 text-white border-2
//            border-green-600 rounded-full hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl"
//       >
//         <CheckSquareIcon classNameName="w-6 h-6" fill="white" />
//       </button>
//     </div>
//   </div>
//   {/* ----------------------------------------------------------------- */}

//   {/* ---------------- Formulario de medicación ----------------------*/}
//   <div classNameName="mb-2 p-6 bg-slate-800">
//     <h3 classNameName="text-xl font-semibold text-white mb-10">
//       Medicación
//     </h3>
//     <div classNameName="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
//       <input
//         type="text"
//         name="carroId"
//         placeholder="carroId"
//         value={idCarro ? idCarro : ""}
//         onChange={handleChangeMed}
//         readOnly
//         classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white hidden mt-2"
//       />

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="medication"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Medicación
//         </label>
//         <input
//           type="text"
//           name="medication"
//           value={medicationData.medication}
//           onChange={handleChangeMed}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="lot"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Lote
//         </label>
//         <input
//           type="text"
//           name="lot"
//           value={medicationData.lot}
//           onChange={handleChangeMed}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="medExpiration"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Fecha de Vencimiento
//         </label>
//         <input
//           type="date"
//           name="medExpiration"
//           value={medicationData.medExpiration}
//           onChange={handleChangeMed}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="medQuantity"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Cantidad
//         </label>
//         <input
//           type="number"
//           name="medQuantity"
//           value={medicationData.medQuantity}
//           onChange={handleChangeMed}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>
//     </div>
//   </div>
//   {/* -------------------------------------------------------------------------------* */}

//   {/* --------------------- Formulario de descartables -----------------------------   */}
//   <div classNameName="mb-2 p-6 bg-slate-800">
//     <h3 classNameName="text-xl font-semibold text-white mb-8">
//       Material Descartable
//     </h3>
//     <div classNameName="grid grid-cols-1 md:grid md:grid-cols-2 gap-8">
//       <input
//         type="text"
//         name="idCarro"
//         placeholder="idCarro"
//         value={idCarro ? idCarro : ""}
//         onChange={handleChangeMat}
//         readOnly
//         classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white hidden"
//       />

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="material"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Descripción
//         </label>
//         <input
//           type="text"
//           name="material"
//           value={material.material}
//           onChange={handleChangeMat}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="lot"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Lote
//         </label>
//         <input
//           type="text"
//           name="lot"
//           value={material.lot}
//           onChange={handleChangeMat}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="matExpiration"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Fecha de Vencimiento
//         </label>
//         <input
//           type="date"
//           name="matExpiration"
//           value={material.matExpiration}
//           onChange={handleChangeMat}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>

//       <div classNameName="relative flex flex-col">
//         <label
//           htmlFor="matQuantity"
//           classNameName="absolute text-white transition-transform duration-200 ease-in-out pointer-events-none
//           transform -translate-y-5 text-md"
//         >
//           Cantidad
//         </label>
//         <input
//           type="number"
//           name="matQuantity"
//           value={material.matQuantity}
//           onChange={handleChangeMat}
//           classNameName="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white mt-2"
//         />
//       </div>
//     </div>
//   </div>

//   {/* ------------------------------------------------------------------------------- */}

//   <div classNameName="flex items-center justify-center gap-4">
//     <button
//       type="submit"
//       classNameName="w-36 bg-[#09f] text-white font-bold rounded-md p-2 hover:bg-blue-600 transition duration-200"
//     >
//       Enviar
//     </button>
//     <button
//       onClick={handleLogout}
//       classNameName="w-36 bg-[#ff5b5c] text-white font-bold rounded-md p-2 hover:bg-red-700 transition duration-200"
//     >
//       Cerrar sesión
//     </button>
//   </div>
// </form>
// </div>
