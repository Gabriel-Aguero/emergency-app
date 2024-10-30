import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IconAt, EyeIcon, IconEyeOff } from "../components/icons/Icons";

const Home = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [eye, setEye] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(user.email, user.password);
      navigate("/formulario_de_datos");
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const checkCarros = () => {
    console.log("checkCarros");
    navigate("/check_carros");
  };

  return (
    <>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Emergency Card
              <span className="sm:block">
                {" "}
                La importancia de estar siempre listos{" "}
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Gestiona y verifica tu carro de emergencia de manera fácil y
              rápida para estar siempre listo cuando más importa
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#home"
              >
                Ingresar
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#home"
              >
                Regitrarme
              </a>             
            </div>
          </div>
        </div>
      </section>
      <section id="home" className="flex flex-wrap h-full lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Emergency Card</h2>

            <p className="mt-4 text-gray-500">
              Emergency Card es una aplicación web que permite a los usuarios
              registrarse y gestionar sus datos del carro de emergencia. A su
              vez, permite a los usuarios a realizar una control del estado del
              carro, optimizando el tiempo y garantizando el contenido del mismo
              en caso de emergencia.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label className="sr-only">Email</label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="current-email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingresa tu correo"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4 ">
                  <IconAt />
                </span>
              </div>
            </div>

            <div>
              <label className="sr-only">Password</label>

              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                />
                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <button type="button" onClick={() => setEye(!eye)}>
                    {eye ? <EyeIcon /> : <IconEyeOff />}
                  </button>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                No tienes cuenta ?
                <Link to="/register" className="underline text-blue-500">
                  Registrate
                </Link>
              </p>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Link to="/reset_password" className="underline text-blue-500">
                  Olvidé mi contraseña
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={checkCarros}
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Chequear carros
              </button>
            </div>
          </form>
        </div>

        <div className="relative w-full lg:h-full lg:w-1/2 ">
          <img
            alt="imagen de autenticación"
            src="/authentication.svg"
            className="inset-0 h-96 w-96 object-cover mx-auto"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
