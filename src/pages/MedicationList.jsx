/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { IconArrowDown, IconArrowUp, } from "../components/icons/Icons";
import FormRegisterCart from "./FormRegisterCart";
import ModalMedicacion from "./ModalMedicacion";
import Swal from "sweetalert2";
import ModalRegisterMedicacion from "./ModalRegisterMedicacion";

const MedicacionList = ({ medicacionList, idCarro }) => {
  const { deleteMedication } = useContext(AuthContext);

  // const [sorting, setSorting] = useState([]);
  // const [medicacionFiltered, setMedicacionFiltered] = useState("");
  const [showFormRegisterInfo, setShowFormRegisterInfo] = useState(false);
  const [dataMedicacion, setDataMedicacion] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMedicacion, setIsModalMedicacion] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setShowFormRegisterInfo(false);
  }, [medicacionList]);

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

  // const handleAdd = () => {
  //   // Implementa la lógica de agregar elementos a la tabla
  //   setIsModalMedicacion(true);
  // };

  

  const toggleAccordion = (id) => {
    setIsOpen((prevId) => (prevId === id ? null : id));
  };

  const getIconAndDaysByExpiration = (expirationDate) => {
    const currentDate = new Date();
    const expiryDate = new Date(expirationDate);
    const timeDiff = expiryDate - currentDate;
    const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let icon;
    if (daysUntilExpiration > 40) {
      icon = <FaCheckCircle className="text-green-500" aria-label="Check icon indicating safe expiration date" />;
    } else if (daysUntilExpiration > 20) {
      icon = <FaExclamationTriangle className="text-yellow-500" aria-label="Warning icon indicating approaching expiration date" />;
    } else {
      icon = <FaTimesCircle className="text-red-500" aria-label="Danger icon indicating near expiration date" />;
    }

    return { icon, daysUntilExpiration };
  };

  return (
    <>
      {showFormRegisterInfo ? (
        <FormRegisterCart idCarro={idCarro} />
      ) : (
        <>
        {/* aqui recorro la lista de medicamentos para mostrar  */}        
        {
         
          medicacionList.map((list) => {
            const { icon, daysUntilExpiration } = getIconAndDaysByExpiration(list.medExpiration);
            return(
              <div key={list.id}>
              <div id={`accordion-${list.id}`} 
                data-accordion="collapse" 
                data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" 
                data-inactive-classes="text-gray-500 dark:text-gray-400"
                className="border flex flex-col rounded-lg border-gray-300 dark:border-gray-700 mt-2 mb-2 shadow-md gap-4"
              >            
                <h2 id={`accordion-heading-${list.id}`} className="p-2">
                  <button type="button" onClick={() => toggleAccordion(list.id)} 
                    className="flex items-center justify-between w-full py-2 rtl:text-right text-xl font-bold text-gray-500" 
                    data-accordion-target="#accordion-flush-body-1" aria-expanded={isOpen === list.id} 
                    aria-controls={`accordion-body-${list.id}`}>

                      <span className="flex items-center gap-2">
                      {icon}
                      {list.medication} - {daysUntilExpiration < 0 ? "Vencido" : `Vence en ${daysUntilExpiration} días` }
                      </span>
                    {/* <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg> */}
                    { isOpen ? <IconArrowUp /> : <IconArrowDown />}
                  </button>
                </h2>
                <div id={`accordion-body-${list.id}`}
                  className={`overflow-hidden p-4 transition-all duration-300 ease-in-out ${isOpen === list.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}        
                  aria-labelledby={`accordion-heading-${list.id}`}>
                  <div className="py-2 flex flex-col gap-2 font-medium">
                    <p className="text-gray-500 dark:text-gray-400">Fecha de vencimiento: {list.medExpiration}</p>
                    <p className="text-gray-500 dark:text-gray-400">Número de lote: {list.lot}</p>
                    <p className="text-gray-500 dark:text-gray-400">Cantidad: {list.medQuantity}</p>
                  </div>  
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleEdit(list.id)}
                      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(list.id)}
                      className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </div>                
                </div>                                     
              </div>
              </div>
            )
          })
          
        }
        
          <ModalMedicacion
            dataMedicacion={dataMedicacion}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

          <ModalRegisterMedicacion
            idCarro={idCarro}
            isModalMedicacion={isModalMedicacion}
            onClose={() => setIsModalMedicacion(false)}
          />
        </>
      )}
    </>
  );
};

export default MedicacionList;
