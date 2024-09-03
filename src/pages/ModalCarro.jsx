/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const ModalCarro = ({ selectedCarros, setIsModalOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full mt-5 border p-4 border-slate-300 shadow-lg shadow-slate-700">
      <h4>Datos del Carro</h4>
      <form className="grid grid-cols-6 gap-6 border p-4">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="numCarro"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Numero de carro
          </label>
          <input
            type="text"
            name="numCarro"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            value={selectedCarros.numCarro}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="precinto"
            className="block text-sm font-medium text-gray-700"
          >
            Precinto Registrado
          </label>

          <input
            type="number"
            name="precinto"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            value={selectedCarros.precinto}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="fechaInicio"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Inicio
          </label>

          <input
            type="date"
            name="fechaInicio"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            placeholder={selectedCarros.fechaInicio}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="fechaUltimoControl"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha Último Control
          </label>

          <input
            type="date"
            name="fechaUltimoControl"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            value={Date.now()}
            placeholder={Date.now()}
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button className="w-full inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalCarro;
