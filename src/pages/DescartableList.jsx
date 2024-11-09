/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { IconAdd } from "../components/icons/Icons";
import Swal from "sweetalert2";
import ModalDescartable from "./ModalDescartable";
import ModalRegisterDescartable from "./ModalRegisterDescartable";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import WarningIcon from "@mui/icons-material/Warning";
import { green, pink, yellow } from "@mui/material/colors";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

const DescartableList = ({ idCarro }) => {
  const { deleteDescartable, getDescartableByCarro, descartables, user } =
    useContext(AuthContext);
  const [dataDescartable, setDataDescartable] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewListDescartable, setViewListDescartable] = useState(false);

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getColorAndIcon = (days) => {
    if (days < 20) {
      return {
        bgColor: "bg-red-400",
        icon: <NotificationImportantIcon sx={{ color: pink[900] }} />,
      };
    } else if (days >= 20 && days < 30) {
      return {
        bgColor: "bg-yellow-300",
        icon: <WarningIcon sx={{ color: yellow[900] }} />,
      };
    } else if (days >= 30) {
      return {
        bgColor: "bg-green-300",
        icon: <DoneAllIcon sx={{ color: green[900] }} />,
      };
    }
  };

  const getListDescartable = async () => {
    await getDescartableByCarro(idCarro);
    setViewListDescartable(true);
  };

  const openEditModal = (data) => {
    setDataDescartable(data);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setDataDescartable(null);
  };

  const openAddModal = () => {
    // abre el modal
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
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
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-xl font-bold text-gray-900/60 sm:text-3xl md:text-3xl mt-10">
            Lista de descartables
          </h1>
          <button
            className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
            onClick={() => getListDescartable()}
          >
            Ver lista de descartables
          </button>

          {user && (
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
                onClick={openAddModal}
              >
                Agregar nuevo material <IconAdd />
              </button>
            </div>
          )}
        </div>

        {viewListDescartable && (
          <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl w-full">
              {descartables.map((list) => {
                const daysUntilExpiration = getDaysUntilExpiration(
                  list.matExpiration
                );
                const { bgColor, icon } = getColorAndIcon(daysUntilExpiration);
                return (
                  <div key={list.id} className="mx-auto p-4 mt-5">
                    <div
                      className={`bg-white shadow-md r ${bgColor} shadow-slate-800/80 rounded-lg p-4 mb-4 max-w-md transition-all duration-300 hover:shadow-blue-800/60`}
                    >
                      <h2 className="text-lg font-bold text-gray-800 border-b capitalize flex gap-2">
                        {icon}
                        {list.material}
                      </h2>
                      <div className="mt-2 text-gray-600">
                        <p>
                          <strong>Fecha de vencimiento:</strong>{" "}
                          {list.matExpiration}
                        </p>
                        <p>
                          <strong>Cantidad:</strong> {list.matQuantity}
                        </p>
                        <p>
                          <strong>Número de lote:</strong> {list.lot}
                        </p>
                      </div>
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
                                handleDelete(list.id, getListDescartable)
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
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {isEditModalOpen && (
        <ModalDescartable
          dataDescartable={dataDescartable}
          onClose={() => {
            closeEditModal();
            getListDescartable();
          }}
        />
      )}

      {isAddModalOpen && (
        <ModalRegisterDescartable
          idCarro={idCarro}
          onClose={closeAddModal}
          onAdd={getListDescartable}
        />
      )}
    </>
  );
};

export default DescartableList;
