/* eslint-disable react/prop-types */

const DescartableList = ({ descartables }) => {
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
                Descripción
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
            {descartables.map((descartable) => (
              <tr
                key={descartable.id}
                className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200 text-center"
              >
                <td className="py-3 px-4 capitalize">{descartable.material}</td>
                <td className="py-3 px-4">
                  {new Date(
                    descartable.matExpiration.seconds * 1000
                  ).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{descartable.matQuantity}</td>
                <td className="flex flex-col gap-2 py-3 px-4">
                  <button
                    onClick={() => handleEdit(descartable.id)}
                    className="bg-blue-500 text-white rounded-md px-2 py-1 mr-2 hover:bg-blue-700 transition duration-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(descartable.id)}
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
  
  export default DescartableList;
  