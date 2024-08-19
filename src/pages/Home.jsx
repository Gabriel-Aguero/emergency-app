import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

  const register = () => {
    navigate("/register");
  };

  const checkCarros = () => {
    navigate("/check_carros");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
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
    </div>
  );
};

export default Home;
