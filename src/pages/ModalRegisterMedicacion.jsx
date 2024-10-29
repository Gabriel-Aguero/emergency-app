/* eslint-disable react/prop-types */


import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { dbMedication } from "../context/listado";
import Swal from "sweetalert2";


const ModalRegisterMedicacion = ({ idCarro, isModalMedicacion, onClose }) => {

    const { addMedication } = useContext(AuthContext);
    const [dataMedicacion, setDataMedicacion] = useState({
        idCarro: "",
        medication: "",
        lot: "",
        medExpiration: "",
        medQuantity: "",
      });

      if (!isModalMedicacion) return null;

      const handleSaveDataMedication = async (e) => {
        e.preventDefault();
        await addMedication(dataMedicacion);
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Cambios guardados correctamente",
            text: "La información del carro ha sido actualizada",
            showConfirmButton: false,
            timer: 2000,
          });
          onClose();
      }

    // Capturo los datos del formulario de medicación
    const handleChangeMed = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setDataMedicacion({
        ...dataMedicacion,
        idCarro: idCarro,
        [name]: value,
        });
    };

    const sortedMedicacion = dbMedication.sort((a, b) => a.order - b.order);

    
    return (              
       <div className="flex flex-col fixed inset-0 z-50 items-center justify-center gap-4 w-full mt-5 border p-4 shadow-lg shadow-slate-700">
            <form
                className="grid grid-cols-1 mx-auto gap-6 border p-4 bg-slate-50 border-violet-600 rounded-lg shadow-md"
                onSubmit={handleSaveDataMedication}
            >
                {/* titulo  */}
                <div className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
                <h4 className="col-span-6 sm:col-span-6 text-center text-blue-700 font-semibold">
                    Formulario de registro
                </h4>                
                </div>
        
                {/* id oculto del carro  */}
                <div className="col-span-6 sm:col-span-3 hidden">
                <label
                    htmlFor="idCarro"
                    className="block text-sm font-medium text-gray-700"
                >
                    Servicio
                </label>
                <input
                    type="text"
                    name="idCarro"
                    value={idCarro ? idCarro : ""}
                    onChange={handleChangeMed}
                    readOnly
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm capitalize"            
                />
                </div>          

                {/* Medicacion         */}
                <div className="col-span-6 sm:col-span-3">            
                    <label
                        htmlFor="medication"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Medicación
                    </label>            
                    <select
                        name="medication"
                        value={dataMedicacion.medication}
                        onChange={handleChangeMed}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        aria-label="Selecciona una opcion"
                        required            
                    > 
                        <option value="" disabled >Seleccione una medicación</option>          
                        { 
                        sortedMedicacion.map(( medicationList ) => (                                                              
                            <option 
                            key={medicationList.idMedication}
                            value={medicationList.medication}                 
                            >
                            {medicationList.medication}
                            </option>                  
                        )
                        )}                  
                    </select>
                </div>
        
                {/* Lote  */}
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="lot"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Numero de Lote
                    </label>

                    <input
                    type="text"
                    name="lot"
                    value={dataMedicacion.lot}
                    onChange={handleChangeMed}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                    />
                </div>

                {/* Fecha de Vencimiento */}
                <div className="col-span-6 sm:col-span-3">
                    <label
                        htmlFor="medExpiration"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Fecha de Vencimiento
                    </label>
        
                    <input
                        type="date"
                        name="medExpiration"
                        value={dataMedicacion.medExpiration}
                        onChange={handleChangeMed}
                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        required
                    />
                </div>
        
                {/* Cantidad */}
                <div className="col-span-6 sm:col-span-3">
                    <label
                    htmlFor="medQuantity"
                    className="block text-sm font-medium text-gray-700"
                    >
                    Cantidad
                    </label>

                    <input
                    type="number"
                    name="medQuantity"
                    value={dataMedicacion.medQuantity}
                    onChange={handleChangeMed}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    required
                    />
                </div>
                
        
                <button
                className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="submit" // onClick={handleOnClick(selectedCarros)}
                >
                Guardar Cambios
                </button>
                <button
                className="col-span-6 inline-block shrink-0 rounded-md border sm:col-span-3 border-blue-600 bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                type="button"
                onClick={onClose}
                >
                Cerrar
                </button>
            </form>
       </div>     
    )
}

export default ModalRegisterMedicacion;