const FormCart = () => {
  
  return (
    <div className="mb-6 p-6 border-b-2 border-slate-400 ">
        <h3 className="text-xl font-semibold text-black mb-4">Carro</h3>
        <div className="grid grid-cols-1 gap-4">
            <input
                type="text"
                placeholder="Número de carro"
                // value={medication}
                // onChange={(e) => setMedication(e.target.value)}
                className="border-2 border-slate-400 rounded-md shadow-md p-2 w-full focus:outline-none focus:border-blue-500 text-black"
            />
            <input
                type="number"
                placeholder="Número de Precinto"
                // value={medication}
                // onChange={(e) => setMedication(e.target.value)}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
                type="number"
                placeholder="Cantidad de carros"
                // value={medication}
                // onChange={(e) => setMedication(e.target.value)}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />               
        </div>
    </div>
  )
}

export default FormCart;