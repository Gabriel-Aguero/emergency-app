import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";

const BuscarCarroPorServicio = () => {

  const [showMedicacionList, setShowMedicacionList] = useState(false);
  const [showDescartableList, setShowDescartableList] = useState(false);

  const [servicioName, setServicioName] = useState("");
  const {
    getServicio,
    servicios,
    getCarrosByServicio,
    carros,
    getMedicationByCarro,
    medications,
    getDescartableByCarro,
    descartables,
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
    setShowMedicacionList(true)    
  };

  const verDescartable = async (idCarro) => {
    await getDescartableByCarro(idCarro);
    setShowDescartableList(true)    
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
        <>
          <div className="flex flex-col m-6">
          <h3 className="text-lg font-bold capitalize">
            Servicio: {servicioName}
          </h3>
          <span className="text-md mt-5 font-bold text-blue-700 mb-5">
            El servicio cuenta con {carros.length ? carros.length : '...'} Carros de paro
          </span>
          <div className="flex flex-col md:flex-row gap-4 mx-auto">
            {carros.map((carro) => (
              <div key={carro.id}
              className="w-80 bg-white p-4 rounded-lg shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4"
            >
              <h3 className="w-full border-b-2 border-slate-600 text-center text-lg font-bold text-gray-700 p-2">
                Información del Carro
              </h3>

              <div className="flex flex-col md:flex md:flex-col gap-4">                
                
                <div className="w-full grid grid-cols-2 gap-2 border-b-2 border-slate-200 p-2">
                  <span className="font-bold">
                    Carro número: 
                  </span>
                  <p>{carro.numCarro}</p>
                </div>
                
                <div className="flex flex-nowrap gap-2 border-b-2 border-slate-200 p-2">
                  <span className="font-bold">
                    Fecha de inicio: 
                  </span>
                  <p>{carro.fechaInicio ? new Date(carro.fechaInicio.seconds * 1000).toLocaleDateString() : ''} </p>
                </div>

                <div className="flex flex-nowrap gap-2 border-b-2 border-slate-200 p-2">
                  <span className="w-full font-bold">
                    Fecha de último control: 
                  </span>
                  <p>{carro.fechaUltimoControl ? new Date(carro.fechaUltimoControl.seconds * 1000).toLocaleDateString() : ''}</p>
                </div>
                
                <div className="flex flex-nowrap gap-4 border-b-2 border-slate-200 p-2">
                  <span className="font-bold">
                    Precinto registrado: 
                  </span>
                  <p>{carro.precinto}</p>
                </div>

              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                <button
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  onClick={() => verMedication(carro.id)}
                >                         
                  Ver Medicación
                </button>
                <button
                  className="text-green-500 hover:text-green-700 transition duration-200"
                  onClick={() => verDescartable(carro.id)}
                >
                  Ver Descartables
                </button>
              </div>
            </div>
            ))}
          </div>
          </div>
          { showMedicacionList && <MedicacionList medications={medications} /> }
          {showDescartableList && <DescartableList descartables={descartables} />}           
        </>
      )}


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
