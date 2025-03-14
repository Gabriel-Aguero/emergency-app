import { Link } from "react-router-dom";
import { IconMenu } from "./icons/Icons";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white">
     
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-full flex p-10 items-center justify-center">                             
          {/* menu de navegación para dispositivos mas grandes */}
          <div className="hidden md:block" id="menu">
            <nav aria-label="Global">
              <ul className="flex justify-center items-center gap-6">

                <li>
                  <Link
                    to="/"
                    className="text-gray-100 text-xl transition font-extrabold"
                    href="#"
                  >
                    Inicio
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                     className="text-gray-100 text-xl transition font-extrabold"
                    href="#"
                  >
                    Acerca de
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contacto"
                     className="text-gray-100 text-xl transition font-extrabold"
                    href="#"
                  >
                    Contacto
                  </Link>
                </li>

                <li>
                  <Link
                    to="/qrcode"
                    className="text-gray-100 text-xl transition font-extrabold"
                    href="#"
                  >
                    Código QR
                  </Link>
                </li>
              </ul>
            </nav>
          </div>                   
          {
          isMenuOpen && (
            <nav className={`fixed inset-0 z-20 bg-cyan-950/90 flex items-center justify-center transform transition-transform duration-1000 ease-in-out ${
              isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            }`}>
              <ul className="space-y-4 text-center text-gray-100">                
                                
                <li>
                  <Link
                    to="/"
                    className="text-gray-100 text-xl transition font-extrabold"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-100 text-xl transition font-extrabold"
                    onClick={toggleMenu}                    
                  >
                    Acerca de
                  </Link>
                </li>
             
                <li>
                  <Link
                    to="/contacto"
                    className="text-gray-100 text-xl transition font-extrabold"
                    onClick={toggleMenu}                    
                  >
                    Contacto
                  </Link>
                </li>
       
                <li>
                  <Link
                    to="/qrcode"
                    className="text-gray-100 text-xl transition font-extrabold"
                    onClick={toggleMenu}                   
                  >
                    Código QR
                  </Link>
                </li>
                
              </ul>
            </nav>
          )}   

        <button
          onClick={toggleMenu}
          className="md:hidden rounded border-2 border-gray-100 p-2 text-gray-100 transition z-20"
        >
          <IconMenu />
        </button>         

        </div>
      </div>
    </header>
  );
};

export default Navbar;
