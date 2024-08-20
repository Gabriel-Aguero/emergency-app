/* eslint-disable react/prop-types */

const MedicacionList = ({ medications }) => {
  const handleEdit = (id) => {
    // Implementa la lógica de edición
    console.log(`Editando medicación con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación
    console.log(`Eliminando medicación con ID: ${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Medicación
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Fecha de Vencimiento
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Cantidad
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medicacion) => (
            <tr
              key={medicacion.id}
              className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200 text-center"
            >
              <td className="py-3 px-4 capitalize">{medicacion.medication}</td>
              <td className="py-3 px-4">
                {new Date(
                  medicacion.medExpiration.seconds * 1000
                ).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{medicacion.medQuantity}</td>
              <td className="flex flex-col gap-2 py-3 px-4">
                <button
                  onClick={() => handleEdit(medicacion.id)}
                  className="bg-blue-500 text-white rounded-md px-2 py-1 mr-2 hover:bg-blue-700 transition duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(medicacion.id)}
                  className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-700 transition duration-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicacionList;
