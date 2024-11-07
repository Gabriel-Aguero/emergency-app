/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
// import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import ModalMedicacion from "./ModalMedicacion";
import Swal from "sweetalert2";
import ModalRegisterMedicacion from "./ModalRegisterMedicacion";
import { IconAdd } from "../components/icons/Icons";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import WarningIcon from '@mui/icons-material/Warning';
import { green, pink, yellow } from "@mui/material/colors";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';



const MedicacionList = ({idCarro}) => {
  // const location = useLocation();
  // const { idCarro } = location.state || {};
  const { deleteMedication, getMedicationByCarro, medications, user } =
    useContext(AuthContext);
  const [dataMedicacion, setDataMedicacion] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMedicacion, setIsModalMedicacion] = useState(false);
  const [viewListMedicacion, setViewListMedicacion] = useState(false);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   getListMedication()
  // }, [medications]);

  const getDaysUntilExpiration = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getColorAndIcon = (days) => {
    if (days < 20) {
      return { bgColor: "bg-red-700/40", icon: <NotificationImportantIcon sx={{ color: pink[800] }} /> };
    } else if (days >= 20 && days < 30) {
      return { bgColor: "bg-yellow-200", icon: <WarningIcon sx={{ color: yellow[900] }} /> };
    } else if (days >= 30 ) {
      return { bgColor: "bg-emerald-400/40", icon: <DoneAllIcon sx={{ color: green[900] }} /> };
    }
  };

  const getListMedication = async () => {
    await getMedicationByCarro(idCarro);
    setViewListMedicacion(true);
  };

  const handleEdit = (data) => {
    setDataMedicacion(data);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // Implementa la lógica de eliminación

    Swal.fire({
      title: "Estas seguro de eliminar este elemento?",
      text: "Si eliminas este elemento no se podrá recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMedication(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El elemento ha sido eliminado correctamente",
          icon: "success",
        });
      }
    });
  };

  const handleAdd = () => {
    // Implementa la lógica de agregar elementos a la tabla
    setIsModalMedicacion(true);
  };

  return (
    <>
      <div className="flex flex-col items-center  min-h-screen">
        <div className="flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-xl font-bold text-gray-900/60 sm:text-3xl md:text-3xl mt-10">
            Lista de Medicaciones
          </h1>
          <button
            className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
            onClick={()=> getListMedication()}>
            Ver lista de mediciones 
          </button>          
     
         { user && (            
            <div className="flex flex-col items-center justify-center gap-4">                          
              <button
                className="bg-blue-500 text-white rounded-md flex gap-2 p-2 hover:bg-blue-700 transition duration-200"
                onClick={handleAdd}
              >
                Agregar nueva Medicación <IconAdd />
              </button>              
            </div>            
          )}
        </div>

        { viewListMedicacion && (
          <>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl w-full">
              {medications.map((list) => {                                  
                
                  const daysUntilExpiration = getDaysUntilExpiration(list.medExpiration);
                  const { bgColor, icon } = getColorAndIcon(daysUntilExpiration);
                  return (
                    <div key={list.id} className={`mx-auto p-4 mt-5`}>
                        <div className={`bg-white shadow-md ${bgColor} shadow-slate-800/80 rounded-lg p-4 mb-4 max-w-md transition-all duration-300 hover:shadow-blue-800/60`}>
                          <h2 className=" flex gap-2 items-center p-2 text-lg font-bold text-gray-800 border-b border-gray-600 capitalize">
                            {icon}
                            {list.medication}
                          </h2>
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
                          {/* oculto los botones de editar y eliminar en caso de no estar logueado*/}

                          {user ? (
                            <>
                              <div className="mt-4 flex justify-between gap-3">
                                <button
                                  onClick={() => handleEdit(list)}
                                  className="bg-blue-500 text-white font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-300"
                                >
                                  Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(list.id)}
                                  className="bg-red-500 text-white font-semibold py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </>
                          ):(
                            <>                      
                            </>
                          )
                          }
                        </div>
                    </div>  
                  )                                
              })}
            </div>
          </>
        )}
      </div>

      <ModalMedicacion
        dataMedicacion={dataMedicacion}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ModalRegisterMedicacion
        idCarro={medications.idCarro}
        isModalMedicacion={isModalMedicacion}
        onClose={() => setIsModalMedicacion(false)}
      />
    </>
  );
};

export default MedicacionList;
