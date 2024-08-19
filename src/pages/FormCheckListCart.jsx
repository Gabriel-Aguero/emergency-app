import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BuscarCarroPorServicio = () => {
  const [servicioName, setServicioName] = useState('');    
  const navigate = useNavigate();
  const { getServicio, servicios, getCarrosByServicio, carros } = useContext(AuthContext);



  useEffect(() => {
    // Obtener la lista de servicios al cargar el componente
    getServicio();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();   
    // Realizar la consulta para obtener los carros según el servicio seleccionado
    const carros = await getCarrosByServicio(servicioName);        
    
    console.log(carros);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg min-h-screen">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <label htmlFor="servicio" className="text-lg font-medium">Seleccione un servicio</label>
        <select
          id="servicio"
          value={servicioName}
          onChange={(e) => setServicioName(e.target.value)}
          className="border-b-2 border-blue-500 p-2 focus:outline-none"
        >
          <option value="">Seleccione un servicio</option>
          {servicios.map(servicio => (
            <option key={servicio.id} value={servicio.nombre}>
              {servicio.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-green-500 text-white rounded-lg p-2 mt-2 hover:bg-green-700 transition duration-200">
          Buscar Carros
        </button>
      </form>

      {carros && (
        <div className="mt-6">
          <h3 className="text-lg font-bold uppercase">Servicio: {servicioName}</h3>
          <ul className="list-disc pl-5">
            {carros.map(carro => (
            <>
              <li key={carro.id} className="flex justify-between items-center mt-5">
                El servicio cuenta con {carro.cantidadCarros} carros
              </li>
              <li className="flex justify-between items-center mt-5">
                Número de Carro: {carro.numCarro} 
              </li>
            </>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuscarCarroPorServicio;
