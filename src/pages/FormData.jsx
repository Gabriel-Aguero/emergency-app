import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CheckSquareIcon from '../components/icons/check';

const FormData = () => {

  const { user, logout, getUsuario, addCarro, usuario,  addMedication, addDescartable } = useContext(AuthContext);
  const [idCarro, setIdCarro] = useState(null);
  const navigate = useNavigate();  
  // Datos del formulario de registro de carro de paro
  const [cartData, setCartData] = useState({
    numCarro: '',
    precinto: '',
    cantidadCarros: '',
    fecha_inicio: '',
    fecha_ultimo_control: '',            
    servicioName: '',
  });

  const [medicationData, setMedicationData] = useState({
    idCarro: '',
    medication: '',
    lot: '',
    medExpiration: '',
    medQuantity: '',   
  });

  const [material, setMaterial] = useState({
    idCarro: '',
    material: '',
    lot: '',
    matExpiration: '',
    matQuantity: '',
  });

  const handleLogout = async () => {
    await logout(); 
    navigate('/');
  }

  // Recupero los datos del usuario a traves del id del usuario logeado 
  const dataUsuario = async () => {
    const email = user.email;    
    await getUsuario(email);    
  }

  const cargarCarro = async () => {
    const id = await addCarro(cartData);
    setIdCarro(id);
  }
  
  // Envio de datos al back
  const handleSubmit = async (e) => {
    e.preventDefault();         
    await addMedication(medicationData);    
    await addDescartable(material);
    
    setMedicationData({
      idCarro: '',
      medication: '',
      lot: '',
      medExpiration: '',
      medQuantity: '',  
    });

    setMaterial({
        idCarro: '',
        material: '',
        lot: '',
        matExpiration: '',
        matQuantity: '',      

    });
  };

  // Capturo los datos del formulario de registro de carro de paro
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCartData({
      ...cartData,
      [name]: value,
    });   
  }  

  const handleChangeMed = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMedicationData({
      ...medicationData,
      idCarro: idCarro,
      [name]: value,
    });      
  }

  const handleChangeMat = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMaterial({
      ...material,
      idCarro: idCarro,
      [name]: value,
    });      
  }

  useEffect(() => { 
    if (user) {                  
      dataUsuario()   
      navigate('/formulario_de_datos');
    }
  }, [ user ]);


  return (
      <>
      { user && (      
      <div className="flex flex-col items-center justify-center mx-auto p-4 min-h-screen max-w-2xl">     
        <div className='flex flex-col justify-center items-center gap-4'>      
          <span className='text-2xl text-center font-bold text-[#09f] mt-4'>Usuario: {user.email}</span>          
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Completa la información</h2>
        </div>        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-2 rounded-lg shadow-2xl shadow-slate-700 w-full bg-slate-800/90">     

          {/*------------ Formulario de registro de carro de paro ------------*/}
          <div className="mb-6 p-6 rounded-md bg-slate-600 shadow-md shadow-slate-700">              
            
              <h3 className="text-xl font-semibold text-white mb-4">Información del Carro de Paro</h3>
            
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">           
            <input
                type="text"
                name="servicioName"
                placeholder="Servicio"
                onChange={handleChange}
                value={cartData.servicioName}                
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />
            <input
                type="text"
                name="numCarro"
                placeholder="Número de carro"
                value={cartData.numCarro}
                onChange={handleChange}
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />
            <input
                type="number"
                name="precinto"
                placeholder="Número de Precinto"
                value={cartData.precinto}
                onChange={handleChange}
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />
            <input
                type="number"
                name="cantidadCarros"
                placeholder="Cantidad de carros"
                value={cartData.cantidadCarros}
                onChange={handleChange}
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />
            <input
                type="date"
                name="fecha_inicio" 
                placeholder="Fecha de inicio"
                value={cartData.fecha_inicio}
                onChange={handleChange}
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />
            <input
                type="date"
                name="fecha_ultimo_control"
                placeholder="Fecha de ultimo control"
                value={cartData.fecha_ultimo_control}
                onChange={handleChange}
                className="border-b-2 border-slate-200 bg-slate-700 shadow-md p-2 w-full focus:outline-none focus:bg-slate-800 text-white"
            />               
            </div>
          
            <div className='flex items-center justify-center gap-4 mt-5'>
             <button type="button" onClick={cargarCarro}
                     className="flex items-center justify-center w-12 h-12 bg-green-500 text-white border-2
                     border-green-600 rounded-full hover:bg-green-600 transition duration-200 shadow-lg hover:shadow-xl">
                    <CheckSquareIcon className="w-6 h-6" fill='white' />
             </button>
            </div>
          </div>  
          {/* ----------------------------------------------------------------- */}
         
         {/* ---------------- Formulario de medicación ----------------------*/}
          <div className="mb-6 border-b-2 border-slate-800 p-6 bg-orange-300">
            <h3 className="text-xl font-semibold text-black mb-4">Medicación</h3>
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">                
                <input
                    type="text"
                    name="carroId"
                    placeholder="carroId"
                    value= {idCarro? idCarro : ''}	
                    onChange={handleChangeMed}
                    readOnly
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 hidden"
                />
                <input
                    type="text"
                    name="medication"
                    placeholder="Medicación"
                    value={medicationData.medication}
                    onChange={handleChangeMed}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="lot"
                    placeholder="Lote"
                    value={medicationData.lot}
                    onChange={handleChangeMed}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="date"
                    name="medExpiration"
                    placeholder="Vencimiento"
                    value={medicationData.medExpiration}
                    onChange={handleChangeMed}
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    name="medQuantity"
                    placeholder="Cantidad"
                    value={medicationData.medQuantity}
                    onChange={handleChangeMed}                    
                    className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
            </div>
          </div>
         {/* -------------------------------------------------------------------------------* */}


          {/* --------------------- Formulario de descartables -----------------------------   */}
          <div className="mb-6 border-b-2 border-slate-400 p-6 bg-violet-300">
          <h3 className="text-xl font-semibold text-black mb-4">Material Descartable</h3>
          <div className="grid grid-cols-1 md:grid md:grid-cols-2 gap-4">
          <input
              type="text"
              name= "idCarro"
              placeholder="idCarro"
              value={idCarro? idCarro : ''}
              onChange={handleChangeMat}
              readOnly              
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 hidden"
            />
            <input
              type="text"
              name= "material"
              placeholder="Descripción"
              value={material.material}
              onChange={handleChangeMat}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name= "lot"
              placeholder="Lote"
              value={material.lot}
              onChange={handleChangeMat}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
                />
            <input
              type="date"
              name= "matExpiration"
              placeholder="Vencimiento"
              value={material.matExpiration}
              onChange={handleChangeMat}
              className="border-2 border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              name= "matQuantity"
              placeholder="Cantidad"
              value={material.matQuantity}
              onChange={handleChangeMat}
              className="border-2 borders-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          </div>


          {/* ------------------------------------------------------------------------------- */}

          <div className='flex items-center justify-center gap-4'>
            <button type="submit" className="w-36 bg-[#09f] text-black border-2 border-blue-600 rounded-md p-2 hover:bg-blue-600 transition duration-200">
              Enviar
            </button>
            <button onClick={handleLogout} className="w-36 bg-[#ff5b5c] text-white border-2 border-slate-100 rounded-md p-2 hover:bg-red-700 transition duration-200">
              Cerrar sesión
            </button>
          </div>

        </form>        
      </div>
      )}
      </>       
  );
};

export default FormData;
