const FormDescartable = () => {
  return (
    <div className="mb-6 border-b-2 border-slate-400 p-6">
          <h3 className="text-xl font-semibold text-black mb-4">Material Descartable</h3>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Material"
              // value={material}
              // onChange={(e) => setMaterial(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
                    type="text"
                    placeholder="Lote"
                    // value={lot}
                    // onChange={(e) => setLot(e.target.value)}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
            <input
              type="date"
              placeholder="Vencimiento"
              // value={matExpiration}
              // onChange={(e) => setMatExpiration(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Cantidad"
              // value={matQuantity}
              // onChange={(e) => setMatQuantity(e.target.value)}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
    </div>
  );
};

export default FormDescartable;