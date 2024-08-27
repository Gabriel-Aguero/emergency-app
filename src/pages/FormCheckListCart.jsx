import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import MedicacionList from "./MedicationList";
import DescartableList from "./DescartableList";

const BuscarCarroPorServicio = () => {
  const [showMedicacionList, setShowMedicacionList] = useState(false);
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

  useEffect(() => {
    setShowMedicacionList(false);
    // Obtener la lista de servicios al cargar el componente
    if (servicioName) {
      getCarrosByServicio(servicioName);
    }
  }, [servicioName]);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   // Realizar la consulta para obtener los carros según el servicio seleccionado
  //   await getCarrosByServicio(servicioName);
  // };

  const verDetalleCarro = async (idCarro) => {
    try {
      await getMedicationByCarro(idCarro);
      await getDescartableByCarro(idCarro);
      setShowMedicacionList(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 shadow-sm bg-white/55 text-black min-h-screen p-2 md:p-10 ">
      <div className="flex flex-col border gap-4 p-10 md:p-6">
        <form
          // onSubmit={handleSearch}
          className="w-full md:max-w-[600px] md:mx-auto flex flex-col border gap-4 p-8 md:p-5"
        >
          <label htmlFor="servicio" className="text-lg font-medium">
            Seleccione un servicio
          </label>
          <select
            id="servicio"
            value={servicioName}
            onChange={(e) => setServicioName(e.target.value)}
            className="border-2 border-slate-600 rounded-sm shadow-lg p-4 focus:outline-none text-black"
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id} value={servicio.nombre}>
                {servicio.nombre}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div className="grid md:grid-cols-2 gap-2 p-5">
        {carros && (
          <>
            <div className={`${servicioName ? "block" : "hidden"} flex flex-col gap-4`}>
              <div className="flex flex-col gap-4 justify-center items-center border p-5">
                <div>
                  <h3 className="text-lg text-black font-bold capitalize">
                    Servicio: {servicioName}
                  </h3>
                  <span className="text-md mt-5 font-bold text-blue-700 mb-5">
                    El servicio cuenta con{" "}
                    {carros.length ? carros.length : "..."} Carros de paro
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mx-auto">
                  {carros.map((carro) => (
                    <div
                      key={carro.id}
                      className=" bg-white p-4 rounded-lg shadow-lg shadow-slate-700 flex flex-col items-center justify-center gap-4 border"
                    >
                      <h3 className="w-full border-b-2 border-slate-600 text-center text-lg font-bold text-gray-700 p-2">
                        Información del Carro
                      </h3>

                      <div className="flex flex-col md:flex md:flex-col gap-4">
                        <div className="flex justify-between gap-2 border-b-2 border-slate-200 p-2 text-black hover:bg-slate-300 transition duration-200">
                          <span className="font-bold">Carro número:</span>
                          <p>{carro.numCarro}</p>
                        </div>

                        <div className="flex justify-between gap-2 border-b-2 border-slate-200 p-2 text-black hover:bg-slate-300 transition duration-200">
                          <span className="font-bold">Fecha de inicio:</span>
                          <p>
                            {carro.fechaInicio
                              ? new Date(
                                  carro.fechaInicio.seconds * 1000
                                ).toLocaleDateString()
                              : ""}{" "}
                          </p>
                        </div>

                        <div className="flex justify-between gap-2 border-b-2 border-slate-200 p-2 text-black hover:bg-slate-300 transition duration-200">
                          <span className="w-full font-bold">
                            Fecha de último control:
                          </span>
                          <p>
                            {carro.fechaUltimoControl
                              ? new Date(
                                  carro.fechaUltimoControl.seconds * 1000
                                ).toLocaleDateString()
                              : ""}
                          </p>
                        </div>

                        <div className="flex justify-between gap-4 border-b-2 border-slate-200 p-2 text-black hover:bg-slate-300 transition duration-200">
                          <span className="font-bold">
                            Precinto registrado:
                          </span>
                          <p>{carro.precinto}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
                        <button
                          className="text-blue-500 font-semibold hover:text-blue-700 transition duration-200"
                          onClick={() => verDetalleCarro(carro.id)}
                        >
                          Ver detalle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 shadow-sm bg-white text-black p-2 border">
              {showMedicacionList && (
                <div>
                  <MedicacionList medications={medications} />
                  <DescartableList descartables={descartables} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuscarCarroPorServicio;
