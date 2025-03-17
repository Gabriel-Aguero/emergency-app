import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <ul className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm font-medium text-gray-400 sm:mb-0 dark:text-gray-400">
          <li>
            <Link
              to="/"
              className="hover:underline hover:text-white me-4 md:me-6"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/register"
              className="hover:underline hover:text-white me-4 md:me-6"
            >
              Registrarme
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="hover:underline hover:text-white me-4 md:me-6"
            >
              Acerca de
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="hover:underline me-4 md:me-6 hover:text-white"
            >
              Contacto
            </Link>
          </li>

          <li>
            <Link
              to="/terminos_y_condiciones"
              className="hover:underline me-4 md:me-6 hover:text-white"
            >
              Términos y Condiciones
            </Link>
          </li>

          <li>
            <Link
              to="/politicas_de_privacidad"
              className="hover:underline hover:text-white"
            >
              Política de Privacidad
            </Link>
          </li>
        </ul>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-300 font-semibold text-center dark:text-gray-400">
          Creado con ❤️ por Gabriel Agüero - Programador Frontend
        </span>
      </div>
    </footer>
  );
};

export default Footer;
