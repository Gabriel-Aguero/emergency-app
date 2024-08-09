const FormCart = () => {
  
  return (
    <div className="mb-6 border-2 border-slate-100 p-4">
            <h3 className="text-xl font-semibold text-white mb-4">Carro</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                    type="text"
                    placeholder="Número de carro"
                    // value={medication}
                    // onChange={(e) => setMedication(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Número de Precinto"
                    // value={medication}
                    // onChange={(e) => setMedication(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Cantidad de carros"
                    // value={medication}
                    // onChange={(e) => setMedication(e.target.value)}
                    className="border-2 border-blue-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />               
            </div>
        </div>
  )
}

export default FormCart;