import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { IconAt } from "../components/icons/Icons";
import Swal from 'sweetalert2'

const FormResetPassword = () => {

  const { resetPassword } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    e.preventDefault();
    setEmail({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email) return setError("Por favor ingresa tu email");
    try {
      await resetPassword(email.email);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Te enviamos un correo para resetear tu contraseña",
        showConfirmButton: false,
        timer: 2000
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }; 

  return (
    <section className="flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Recupera tu contraseña</h1>

          <p className="mt-4 text-gray-500">
            Ingresa tu correo y te enviaremos instrucciones para recuperar tu contraseña.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label className="sr-only">Email</label>
            { error && <p className="text-sm text-red-500 text-center">{error}</p>}            

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

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 flex items-center gap-2">              
              <Link to="/" className="underline text-blue-500">
                Volver al inicio
              </Link>
            </p>            

          </div>

          <div className="flex items-center justify-between">
            <button className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            type="submit">            
              Recuperar Password
            </button>            
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="imagen de autenticación"
          src="/public/authentication.svg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default FormResetPassword;