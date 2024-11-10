/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import ModalMedicacion from "./ModalMedicacion";
import Swal from "sweetalert2";
import ModalRegisterMedicacion from "./ModalRegisterMedicacion";
import { IconAdd } from "../components/icons/Icons";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import { green, pink, yellow } from "@mui/material/colors";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const MedicacionList = ({ idCarro }) => {
  const { deleteMedication, getMedicationByCarro, medications, user } =
    useContext(AuthContext);
  const [dataMedicacion, setDataMedicacion] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewListMedicacion, setViewListMedicacion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getColorAndIcon = (days) => {
    if (days < 20) {
      return {
        bgColor: "bg-red-300",
        icon: <NotificationImportantIcon sx={{ color: pink[800] }} />,
      };
    } else if (days >= 20 && days < 30) {
      return {
        bgColor: "bg-yellow-200",
        icon: <WarningIcon sx={{ color: yellow[900] }} />,
      };
    } else if (days >= 30) {
      return {
        bgColor: "bg-green-300",
        icon: <DoneAllIcon sx={{ color: green[900] }} />,
      };
    }
  };

  useEffect(() => {
    getListMedicationByCarro(idCarro);
  }, [idCarro]);

  const getListMedicationByCarro = async (idCarro) => {
    await getMedicationByCarro(idCarro);
    setIsLoading(false);
  };

  const getListMedication = async () => {
    if (isLoading) return;

    if (medications.length > 0) {
      setViewListMedicacion(true);
      getListMedicationByCarro(idCarro);
    } else {
      // aqui poongo un alert
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
    setDataMedicacion(data);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id, getListMedication) => {
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
            getListMedication(); // Llamada para actualizar la lista
          });
        });
      }
    });
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDataMedicacion(null);
  };

  const openAddModal = () => {
    // abre el modal
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen bg-">
        <div className="flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-xl font-bold text-gray-900/60 sm:text-3xl md:text-3xl mt-10">
            Lista de Medicaciones
          </h1>
          <button
            className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
            onClick={() => getListMedication()}
          >
            Ver lista de mediciones
          </button>

          {user && (
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
                onClick={openAddModal}
              >
                Agregar nueva Medicación <IconAdd />
              </button>
            </div>
          )}
        </div>

        {viewListMedicacion && medications.length > 0 && (
          <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl w-full">
              {medications.map((list) => {
                const daysUntilExpiration = getDaysUntilExpiration(
                  list.medExpiration
                );
                const { bgColor, icon } = getColorAndIcon(daysUntilExpiration);
                return (
                  <div
                    key={list.id}
                    className={`${bgColor} shadow-md shadow-slate-800/80 rounded-lg p-4 mb-2 max-w-md hover:scale-105 transition-all ease-in-out duration-700 hover:shadow-blue-800/60`}
                  >
                    <div className="flex justify-between items-center border-b border-gray-600">
                      <h2 className="flex gap-2 items-center p-2 text-xl font-bold text-gray-800  capitalize">
                        {icon}
                        {list.medication}
                      </h2>
                    </div>
                    <div className="mt-2 text-gray-600 font-bold">
                      <p>
                        <strong>Fecha de vencimiento:</strong>{" "}
                        {list.medExpiration}
                      </p>
                      <p>
                        <strong>Cantidad:</strong> {list.medQuantity}
                      </p>
                      <p>
                        <strong>Número de lote:</strong> {list.lot}
                      </p>
                    </div>
                    <div className="flex justify-center items-center mt-4 p-2 border-t border-gray-600">
                      <span className="text-gray-800 text-lg font-bold ">
                        {daysUntilExpiration <= 0 ? (
                          <>
                            <span>Venció hace {daysUntilExpiration} días</span>
                          </>
                        ) : (
                          <>
                            <span>Vence en: {daysUntilExpiration} días</span>
                          </>
                        )}
                      </span>
                    </div>
                    {/* oculto los botones de editar y eliminar en caso de no estar logueado*/}

                    {user ? (
                      <>
                        <div className="mt-4 flex justify-between gap-3">
                          <button
                            onClick={() => openEditModal(list)}
                            className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(list.id, getListMedication)
                            }
                            className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {isEditModalOpen && dataMedicacion && (
        <ModalMedicacion
          dataMedicacion={dataMedicacion}
          onClose={() => {
            closeEditModal();
            getListMedication();
          }}
        />
      )}

      {isAddModalOpen && (
        <ModalRegisterMedicacion
          idCarro={idCarro}
          onClose={closeAddModal}
          onAdd={getListMedication}
        />
      )}
    </>
  );
};

export default MedicacionList;
