import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";

const BuscarCarroPorServicio = () => {
  const [servicioName, setServicioName] = useState("");
  const {
    getServicio,
    servicios,
    getCarrosByServicio,
    carros,
    getMedicationByCarro,
    medications,
  } = useContext(AuthContext);

  useEffect(() => {
    // Obtener la lista de servicios al cargar el componente
    getServicio();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Realizar la consulta para obtener los carros según el servicio seleccionado
    await getCarrosByServicio(servicioName);
  };

  const verMedication = async (idCarro) => {
    await getMedicationByCarro(idCarro);
  };

  return (
    <div className="p-10 w-full max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-lg min-h-screen">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <label htmlFor="servicio" className="text-lg font-medium">
          Seleccione un servicio
        </label>
        <select
          id="servicio"
          value={servicioName}
          onChange={(e) => setServicioName(e.target.value)}
          className="border-b-2 border-blue-500 p-4 focus:outline-none"
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio.id} value={servicio.nombre}>
              {servicio.nombre}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-[#09f] text-white rounded-lg p-2 mt-2 hover:bg-blue-700 transition duration-200"
        >
          Buscar Carros
        </button>
      </form>

      {carros && (
        <div className="flex flex-col m-6">
          <h3 className="text-lg font-bold uppercase">
            Servicio: {servicioName}
          </h3>
          <span className="text-md mt-5 font-bold text-blue-700">
            El servicio cuenta con {carros.length} Carros de paro
          </span>
          <ul className="list-disc pl-5">
            {carros.map((carro) => (
              <li
                key={carro.id}
                className="flex gap-4 md:flex md:flex-col mt-5"
              >
                <div className="flex gap-8 items-center">
                  Numero de Carro: {carro.numCarro}
                </div>
                <button
                  className="text-green-500 text-md font-bold hover:text-green-700 transition duration-200"
                  onClick={() => verMedication(carro.id)}
                >
                  Ver Detalle
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <MedicacionList medications={medications} />
    </div>
  );
};

export default BuscarCarroPorServicio;

// <div className="flex justify-between items-center mt-5">
//   Fecha Inicio:{" "}
//   {carro.fechaInicio
//     ? new Date(
//         carro.fechaInicio.seconds * 1000
//       ).toLocaleDateString()
//     : ""}
// </div>
