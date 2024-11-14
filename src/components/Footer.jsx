import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Emergency Card
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0 dark:text-gray-400">
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
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-300 font-semibold sm:text-center dark:text-gray-400">
          Creado con ❤️ por Gabriel Agüero - Programador Frontend
        </span>
      </div>
    </footer>
  );
};

export default Footer;
