import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";
import { SpinnerDiamond } from "spinners-react";
export const ContainerElementsCart = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { idCarro } = location.state || {};
  const [viewElements, setViewElements] = useState(false);
  const [loading, setLoading] = useState(true);

  const viewListMedication = () => {
    setLoading(false);
    setViewElements(true);
  };

  const viewListDescartable = () => {
    setLoading(false);
    setViewElements(false);
  };
  return (
    <div className="flex flex-col mt-10 items-center min-h-screen">
      <h1 className="text-xl md:text-3xl font-bold mb-10">
        Contenido del Carro
      </h1>
      <div className="flex flex-col md:flex md:flex-row gap-4 justify-center items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => viewListMedication()}
        >
          Sección medicaciones
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => viewListDescartable()}
        >
          Sección descartables
        </button>

        {user ? (
          <Link
            to="/info_cart"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver al listado de carros
          </Link>
        ) : (
          <Link
            to="/check_carros"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Volver al listado de carros
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-10">
        {loading ? (
          <>
            <img src="/register.svg" alt="Logo" className="h-96 w-auto" />
          </>
        ) : // <MedicacionList />
        // aqui debo preguntar si el viewElements es true
        viewElements ? (
          <MedicacionList idCarro={idCarro} />
        ) : (
          <DescartableList idCarro={idCarro} />
        )}
      </div>
    </div>
  );
};
