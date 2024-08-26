/* eslint-disable react/prop-types */
import { IconDelete } from "../components/icons/Icons";
import { IconEdit } from "../components/icons/Icons";

const DescartableList = ({ descartables }) => {
  const handleEdit = (id) => {
    // Implementa la lógica de edición
    console.log(`Editando medicación con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación
    console.log(`Eliminando medicación con ID: ${id}`);
  };

  const getRowColor = (Fecha_de_Vencimiento) => {
    const now = new Date();
    const expirationDate = new Date(Fecha_de_Vencimiento.seconds * 1000);
    const timeDiff = expirationDate - now;
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff <= 10) {
      return "bg-red-600 hover:bg-red-500"; // Naranja si faltan 10 dias o menos para vencimiento
    } else if (daysDiff <= 30) {
      return "bg-yellow-600 hover:bg-yellow-500"; // Amarillo si fatlan 30 o menos para el vencimiento
    }
    return "bg-green-600 hover:bg-green-500"; // Verde si faltan mas de 30 dias para vencimiento
  };

  return (
    <div className="mt p-5">
      <span className="text-lg font-bold bg-slate-400 p-2">Descatable</span>
      <table className="min-w-full shadow-md rounded-lg mt-1">
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
              className={`${getRowColor(descartable.matExpiration)}  border-b border-gray-200 hover:bg-gray-600 text-center `}
            >
              <td className="py-3 px-4 capitalize">{descartable.material}</td>
              <td className="py-3 px-4">
                {new Date(
                  descartable.matExpiration.seconds * 1000
                ).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">{descartable.matQuantity}</td>
              <td className="flex flex-col gap-2 py-3 px-4 justify-center items-center">
                <button
                  onClick={() => handleEdit(descartable.id)}
                  className="bg-blue-500 text-white rounded-md p-1 hover:bg-blue-700 transition duration-200"
                >
                  <IconEdit />
                </button>
                <button
                  onClick={() => handleDelete(descartable.id)}
                  className="bg-red-500 text-white rounded-md p-1 hover:bg-red-700 transition duration-200"
                >
                  <IconDelete />
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
