import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { dataServicio } from "../context/sector";
import Swal from "sweetalert2";
const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    legajo: 0,
    servicioName: "",
  });

  const { signup, addProfileUser, checkAndAddService } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleChangeUsers = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si el servicio existe en la base de datos
      // const servicioName = await checkAndAddService(user.servicioName);

      // Registrar usuario en la base de datos
      const userCredential = await signup(user.email, user.password);
      const uid = userCredential.user.uid;

      await addProfileUser({
        uid: uid,
        firstName: user.firstName,
        lastName: user.lastName,
        legajo: user.legajo,
        email: user.email,
        servicioName: "",
      });

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Usuario creado correctamente",
        text: "La información ha sido actualizada",
        showConfirmButton: false,
        timer: 2000,
      });

      // limpiaar los campos
      setUser({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        legajo: 0,
        servicioName: "",
      });

      // Agrgrar algun popus de visualización de datos
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // ordeno los servicios alfabeticamente

  const sortedServicios = [...dataServicio].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="hidden lg:block relative h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/register.svg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <img src="/bienvenido.svg" alt="Logo" className="h-40 sm:h-52" />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Bienvenido, gracias por registrarte en mi Aplicación
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              En este formulario podrás registrar tus datos de usuario y perfil
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              {/* nombre */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="Nombre"
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              {/* apellido */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              {/* legajo */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Legajo
                </label>

                <input
                  type="text"
                  name="legajo"
                  placeholder="Legajo"
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
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
                  // value={user.servicioName}
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                  // onChange={(e) => setServicioName(e.target.value)}
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
              </div>

              {/* email */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="correo@site.com"
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              {/* password */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  name="password"
                  onChange={handleChangeUsers}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6">
                <label className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    Quieres recibir emails sobre aplicaciónes para entornos
                    hospitalarios y conocer mas sobre nuestros servicios
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <p className="text-sm text-gray-500">
                  Al crear una cuenta acepta nuestros
                  <Link
                    to="/terminos_y_condiciones"
                    className="text-gray-700 underline"
                  >
                    {" "}
                    terminos y condiciones asi como la{" "}
                  </Link>
                  y{" "}
                  <a href="#" className="text-gray-700 underline">
                    política de privacidad
                  </a>
                  .
                </p>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Crear cuenta
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Ya tienes una cuenta ?
                  <Link
                    to="/"
                    className="text-gray-700 underline m-2 hover:text-blue-600"
                  >
                    Ingresa aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
