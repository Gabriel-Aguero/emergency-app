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
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Emergency Card</h1>

          <p className="mt-4 text-gray-500">
            Emergency Card es una aplicación web que permite a los usuarios
            registrarse y gestionar sus datos del carro de emergencia. A su vez,
            permite a los usuarios a realizar una control del estado del carro,
            optimizando el tiempo y garantizando el contenido del mismo en caso
            de emergencia.
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

            <button className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              Ingresar
            </button>
          </div>
          <button
            type="button"
            onClick={checkCarros}
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Chequear carros
          </button>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt=""
          src="/public/authentication.svg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Home;

/* <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-md p-20 bg-white border border-purple-700 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">Emergency Card</h1>
        <h2 className="text-xl font-semibold text-purple-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <input
            className="border-b-2 border-blue-500 bg-white p-2 w-full focus:outline-none focus:border-violet-300 placeholder-gray-500"
            type="email"
            name="email"
            placeholder="correo@site.com"
            onChange={handleChange}
          />
          <input
            className="border-b-2 border-blue-500 bg-white p-2 w-full focus:outline-none focus:border-violet-300 placeholder-gray-500"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-200 focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
        <button
          className="w-full bg-violet-500 text-white rounded-lg py-2 hover:bg-violet-700 transition duration-200"
          onClick={register}
        >
          Registrarme
        </button>
        <button
          className="w-full bg-gray-300 text-black rounded-lg py-2 hover:bg-gray-500 transition duration-200"
          onClick={checkCarros}
        >
          Chequear carros
        </button>
      </div>
    </div> */
