const FormDescartable = () => {
  return (
    <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Material Descartable</h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Material"
              // value={material}
              // onChange={(e) => setMaterial(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="date"
              placeholder="Vencimiento"
              // value={matExpiration}
              // onChange={(e) => setMatExpiration(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Cantidad"
              // value={matQuantity}
              // onChange={(e) => setMatQuantity(e.target.value)}
              className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
  );
};

export default FormDescartable;