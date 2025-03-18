/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import ModalDescartable from "./ModalDescartable";

const DescartableList = ({ idCarro }) => {
  const {
    deleteDescartable,
    getDescartableByCarro,
    descartables,
    isAuthenticated,
  } = useContext(AuthContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataDescartable, setDataDescartable] = useState(null);

  const getDaysUntilExpirationDes = (expirationDateDes) => {
    const today = new Date();
    const expDate = new Date(expirationDateDes);
    const diffTime = expDate - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return "Vencido";
    }
    return days;
  };

  const getColorAndIconDes = (days) => {
    if (days === "Vencido" || days < 0) {
      return {
        bgColor: "bg-red-300",
        icon: "🔔",
    }
    } else if (days >= 0 && days < 20) {
      return {
        bgColor: "bg-red-300",
        icon: "🔔",
      };
    } else if (days >= 20 && days < 30) {
      return {
        bgColor: "bg-yellow-200",
        icon: "⚠️",
      };
    } else if (days >= 30) {
      return {
        bgColor: "bg-green-300",
        icon: "✅",
      };
    } else {
      // Valor por defecto para casos no manejados
      return {
        bgColor: "bg-gray-200",
        icon: "❓",
      };
    }
  };

  useEffect(() => {
    loadDescartable();
  }, [idCarro, getDescartableByCarro]);

  const loadDescartable = async () => {
    await getDescartableByCarro(idCarro);
    if (descartables.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay descartables registrados",
        text: "Agrega nuevos descartables",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
      });
    }
  };

  const openEditModal = (data) => {
    setDataDescartable(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = (id, getListDescartable) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este elemento?",
      text: "Si eliminas este elemento no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDescartable(id).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El elemento ha sido eliminado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            getListDescartable(); // Llamada para actualizar la lista
          });
        });
      }
    });
  };

  return (
    <>
      <table className="overflow-x-auto min-w-full bg-white border border-gray-200 scroll-m-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Material</th>
            <th className="py-2 px-4 text-left">Lote</th>
            <th className="py-2 px-4 text-center">Cantidad</th>
            <th className="py-2 px-4 text-right">Fecha de Vencimiento</th>
            <th className="py-2 px-4 text-right">Días restantes</th>
            <th className="py-2 px-4 text-right">Estado</th>
            {isAuthenticated && (
              <>
                <th className="py-2">Editar</th>
                <th className="py-2">Eliminar</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {descartables.map((descartable) => {
            const daysUntilExpirationDes = getDaysUntilExpirationDes(
              descartable.matExpiration
            );
            const { bgColor, icon } = getColorAndIconDes(
              daysUntilExpirationDes
            );

            return (
              <tr
                key={descartable.id}
                className={`${bgColor} border-b border-gray-200 hover:bg-opacity-75`}
              >
                <td className="py-2 px-4 text-left">{descartable.material}</td>
                <td className="py-2 px-4 text-left">{descartable.lot}</td>
                <td className="py-2 px-4 text-center">
                  {descartable.matQuantity}
                </td>
                <td className="py-2 px-4 text-right">
                  {descartable.matExpiration}
                </td>
                <td className="py-2 px-4 text-right">
                  {daysUntilExpirationDes === "Vencido"
                    ? "Vencido"
                    : `${daysUntilExpirationDes} días`}
                </td>
                <td className="py-2 px-4 text-center">{icon}</td>

                {isAuthenticated && (
                  <>
                    {" "}
                    <td className="py-2 px-4">
                      <button
                        onClick={() => openEditModal(descartable)}
                        className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Editar
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(descartables.id)}
                        className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {isEditModalOpen && (
        <ModalDescartable
          dataDescartable={dataDescartable}
          onClose={() => {
            closeEditModal();
          }}
        />
      )}
    </>
  );
};

export default DescartableList;
