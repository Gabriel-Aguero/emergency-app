/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CheckSquareIcon from './icons/check';


// eslint-disable-next-line react/prop-types
const FormCart = () => {
  
  const { addCarro } = useContext(AuthContext);

  const [cartData, setCartData] = useState({
    numCarro: '',
    precinto: '',
    cantidadCarros: '',
    fecha_inicio: '',
    fecha_ultimo_control: '',            
    servicioName: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCartData({
      ...cartData,
      [name]: value,
    });   
  }

    const handleSubmit = (e) => {
    e.preventDefault();
    addCarro(cartData); 
    setCartData({
      numCarro: '',
      precinto: '',
      cantidadCarros: '',
      fecha_inicio: '',
      fecha_ultimo_control: '',            
      servicioName: '',
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-300 p-6 rounded-lg shadow-2xl shadow-slate-700 w-full">  
      <div className="mb-6 p-6 border-b-2 border-slate-400 ">
        <h3 className="text-xl font-semibold text-black mb-4">Información del Carro de Paro</h3>
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">           
            <input
                type="text"
                name="servicioName"
                placeholder="Servicio"
                onChange={handleChange}
                value={cartData.servicioName}                
                className="border-2 border-slate-400 rounded-md shadow-md p-2 w-full focus:outline-none focus:border-blue-500 text-black"
            />
            <input
                type="text"
                name="numCarro"
                placeholder="Número de carro"
                value={cartData.numCarro}
                onChange={handleChange}
                className="border-2 border-slate-400 rounded-md shadow-md p-2 w-full focus:outline-none focus:border-blue-500 text-black"
            />
            <input
                type="number"
                name="precinto"
                placeholder="Número de Precinto"
                value={cartData.precinto}
                onChange={handleChange}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
                type="number"
                name="cantidadCarros"
                placeholder="Cantidad de carros"
                value={cartData.cantidadCarros}
                onChange={handleChange}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
                type="date"
                name="fecha_inicio" 
                placeholder="Fecha de inicio"
                value={cartData.fecha_inicio}
                onChange={handleChange}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
                type="date"
                name="fecha_ultimo_control"
                placeholder="Fecha de ultimo control"
                value={cartData.fecha_ultimo_control}
                onChange={handleChange}
                className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />               
        </div>
        <div className='flex items-center justify-center gap-4 mt-5'>
        <button
          type="submit"
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white border-2
                     border-green-600 rounded-full hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl">
          <CheckSquareIcon className="w-6 h-6" fill='white' />
        </button>
        </div>
      </div>
    </form>
  )
}

export default FormCart;