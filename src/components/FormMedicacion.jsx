import { useState } from "react";

const FormMedicacion = ( { onMedicationDataChange } ) => {

  const [medicationData, setMedicationData] = useState({
    medication: '',
    lot: '',
    medExpiration: '',
    medQuantity: '',   
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicationData({
      ...medicationData,
      [name]: value,
    });
    onMedicationDataChange(medicationData);
  }
    return (
        <div className="mb-6 border-b-2 border-slate-400 p-6">
            <h3 className="text-xl font-semibold text-black mb-4">Medicación</h3>
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="medication"
                    placeholder="Medicación"
                    value={medicationData.medication}
                    onChange={handleChange}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="lot"
                    placeholder="Lote"
                    value={medicationData.lot}
                    onChange={handleChange}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    name="medExpiration"
                    placeholder="Vencimiento"
                    value={medicationData.medExpiration}
                    onChange={handleChange}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    name="medQuantity"
                    placeholder="Cantidad"
                    value={medicationData.medQuantity}
                    onChange={handleChange}                    
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
        </div>
  );
};

export default FormMedicacion;