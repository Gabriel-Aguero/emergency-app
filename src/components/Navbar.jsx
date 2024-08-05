import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-violet-900 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-white font-bold">
          <Link to="/">Emergency Card</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-purple-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? "block" : "hidden"} w-full md:w-auto`}>
          <div className="flex flex-col md:flex-row md:space-x-6 mt-2 md:mt-0">
            <Link to="/" className="text-white font-bold text-lg hover:text-yellow-300 p-2">Home</Link>
            <Link to="/register" className="text-white text-lg hover:text-yellow-300 p-2">Register</Link>
            <Link to="/login" className="text-white text-lg hover:text-yellow-300 p-2">Login</Link>
            <Link to="/formdata" className="text-white text-lg hover:text-yellow-300 p-2">Form Data</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
