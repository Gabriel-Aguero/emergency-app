import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(user.email, user.password);
      navigate("/formulario_de_datos");
    } catch (error) {
      let errorMessage =
        "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.";

      // Maneja errores específicos de Firebase
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta. Inténtalo de nuevo.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "El usuario no existe. Verifica tu correo electrónico.";
          break;
        case "auth/invalid-email":
          errorMessage = "El correo electrónico no es válido.";
          break;
        default:
          errorMessage = error.message; // Mensaje de error por defecto
      }

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="corre@site.com"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Ingresa tu contrasena"
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
      <button onClick={register}>Registrarme</button>
    </div>
  );
};

export default Login;
