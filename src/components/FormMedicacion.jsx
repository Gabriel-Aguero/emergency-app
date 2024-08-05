const FormMedicacion = () => {
    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Medicación</h3>
            <div className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Medicación"
                    // value={medication}
                    // onChange={(e) => setMedication(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Lote"
                    // value={lot}
                    // onChange={(e) => setLot(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    placeholder="Vencimiento"
                    // value={medExpiration}
                    // onChange={(e) => setMedExpiration(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    // value={medQuantity}
                    // onChange={(e) => setMedQuantity(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
        </div> >
  );
};

export default FormMedicacion;