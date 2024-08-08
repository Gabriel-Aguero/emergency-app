import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; 

const Home = () => {

  const [user, setUser] = useState({
    email: '',    
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]: e.target.value});    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();       
    try {
      await login(user.email, user.password);
      navigate('/formulario_de_datos');  
    } catch (error) {
      console.error("Error logging in: ", error);
    }        
  }

  const register = () => {
    navigate("/register");
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-slate-800 mb-8">Emergency Card</h1>
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md p-6 bg-white border-2 border-purple-700 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-purple-800">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800"
            type="email"
            name="email"
            placeholder="correo@site.com"
            onChange={handleChange}
          />
          <input
            className="border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800"
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
          <button className="bg-purple-600 text-white rounded-lg p-2 hover:bg-purple-800 transition duration-200 focus:outline-none focus:shadow-outline">
            Login
          </button>
        </form>
        <button
          className="w-full bg-purple-600 text-white rounded-lg p-2 mt-2 hover:bg-purple-800 transition duration-200"
          onClick={register}
        >
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default Home;
