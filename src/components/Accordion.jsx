import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-4 w-full max-w-2xl mx-auto">
      <button
        className="w-full p-6 text-left bg-blue-100 hover:bg-blue-200 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{title}</span>
        {isOpen ? (
          <FaChevronUp className="w-5 h-5" /> // Flecha hacia arriba cuando está abierto
        ) : (
          <FaChevronDown className="w-5 h-5" /> // Flecha hacia abajo cuando está cerrado
        )}
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};
