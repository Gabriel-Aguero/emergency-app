import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
      const servicioName = await checkAndAddService(user.servicioName);

      // Registrar usuario en la base de datos
      const userCredential = await signup(user.email, user.password);
      const uid = userCredential.user.uid;

      await addProfileUser({
        uid: uid,
        firstName: user.firstName,
        lastName: user.lastName,
        legajo: user.legajo,
        email: user.email,
        servicioName: servicioName,
      });

      // Agrgrar algun popus de visualización de datos
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
      <h1 className="text-4xl font-bold text-white mb-8">Emergency Card</h1>
      <div className="flex flex-col gap-4 items-center justify-center w-full max-w-md p-6 bg-white border-2 border-purple-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-purple-800">Registrarse</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="text"
            name="firstName"
            placeholder="Nombre"
            onChange={handleChangeUsers}
          />
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="text"
            name="lastName"
            placeholder="Apellido"
            onChange={handleChangeUsers}
          />
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="text"
            name="legajo"
            placeholder="Legajo"
            onChange={handleChangeUsers}
          />
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="text"
            name="servicioName"
            placeholder="Servicio"
            onChange={handleChangeUsers}
          />
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="email"
            name="email"
            placeholder="correo@site.com"
            onChange={handleChangeUsers}
          />
          <input
            className="border-b-2 border-purple-600 p-2 w-full focus:outline-none focus:border-purple-800"
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChangeUsers}
          />
          <button className="bg-purple-500 text-white rounded-lg p-2 hover:bg-purple-800 transition duration-200">
            Registrarse
          </button>
        </form>
        <button
          className="bg-purple-500 text-white rounded-lg p-2 mt-2 hover:bg-purple-800 transition duration-200 w-full"
          onClick={() => navigate("/")}
        >
          Ir a Login
        </button>
      </div>
    </div>
  );
};

export default Register;
