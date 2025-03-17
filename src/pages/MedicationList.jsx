/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import ModalMedicacion from "./ModalMedicacion";

const MedicacionList = ({ idCarro }) => {
  const {
    getMedicationByCarro,
    medications,
    deleteMedication,
    isAuthenticated,
  } = useContext(AuthContext);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataMedication, setDataMedication] = useState(null);

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days < 0) {
      return "Vencido";
    }
    return days;
  };

  const getColorAndIcon = (days) => {
    if (days < 20) {
      return {
        bgColor: "bg-red-300",
        icon: "​🔔​",
      };
    } else if (days >= 20 && days < 30) {
      return {
        bgColor: "bg-yellow-200",
        icon: "⚠️​",
      };
    } else if (days >= 30) {
      return {
        bgColor: "bg-green-300",
        icon: "✅​",
      };
    }
  };

  useEffect(() => {
    loadMedication();
  }, [idCarro, getMedicationByCarro]);

  const loadMedication = async () => {
    await getMedicationByCarro(idCarro);
    if (medications.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No hay medicaciones registradas",
        text: "Agrega nuevas medicaciones",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#d33",
      });
    }
  };

  const openEditModal = (data) => {
    setDataMedication(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, loadMedication) => {
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
        deleteMedication(id).then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "El elemento ha sido eliminado correctamente",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#3085d6",
          }).then(() => {
            loadMedication(); // Llamada para actualizar la lista
          });
        });
      }
    });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <table className="overflow-x-auto min-w-full bg-white border border-gray-200 scroll-m-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Nombre</th>
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
          {medications.map((medication) => {
            const daysUntilExpiration = getDaysUntilExpiration(
              medication.medExpiration
            );
            const { bgColor, icon } = getColorAndIcon(daysUntilExpiration);

            return (
              <tr
                key={medication.id}
                className={`${bgColor} border-b border-gray-200 hover:bg-opacity-75`}
              >
                <td className="py-2 px-4 text-left">{medication.medication}</td>
                <td className="py-2 px-4 text-left">{medication.lot}</td>
                <td className="py-2 px-4 text-center">
                  {medication.medQuantity}
                </td>
                <td className="py-2 px-4 text-right">
                  {medication.medExpiration}
                </td>
                <td className="py-2 px-4 text-right">
                  {daysUntilExpiration === "Vencido"
                    ? "Vencido"
                    : `${daysUntilExpiration} días`}
                </td>
                <td className="py-2 px-4 text-center">{icon}</td>
                {isAuthenticated && (
                  <>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => openEditModal(medication)}
                        className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                      >
                        Editar
                      </button>
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(medication.id)}
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

      {isEditModalOpen && dataMedication && (
        <ModalMedicacion
          dataMedicacion={dataMedication}
          onClose={() => {
            closeEditModal();
          }}
        />
      )}
    </>
  );
};

export default MedicacionList;
