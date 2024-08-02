import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();    
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-8">Emergency Card</h1>
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md p-6 bg-white border-2 border-purple-700 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-purple-800">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800"
            type="email"
            name="email"
            placeholder="correo@site.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-purple-700 text-white rounded-lg p-2 hover:bg-purple-800 transition duration-200">
            Login
          </button>
        </form>
        <button
          className="bg-purple-700 text-white rounded-lg p-2 mt-2 hover:bg-purple-800 transition duration-200"
          onClick={register}
        >
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default Home;
