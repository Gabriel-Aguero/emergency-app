import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormMedicacion from '../components/FormMedicacion';
import FormDescartable from '../components/FormDescartable';
import FormCart from '../components/FormCart';

const FormData = () => {

  const { user, logout, getUsuario, usuario,  addMedication } = useContext(AuthContext);
  const navigate = useNavigate();

  const [medicationData, setMedicationData] = useState({
    medication: '',
    lot: '',
    medExpiration: '',
    medQuantity: '',
    material: '',
    matExpiration: '',
    matQuantity: '',
  });

  // const [material, setMaterial] = useState('');
  // const [matExpiration, setMatExpiration] = useState('');
  // const [matQuantity, setMatQuantity] = useState('');
  

  const handleLogout = async () => {
    await logout(); 
    navigate('/');
  }

  // const handleCartDataChange = (data) => {
  //   setCartData(data);
  // }

  const handleMedicationDataChange = (data) => {
    setMedicationData(data);
  }

  // Recupero los datos del usuario a traves del id del usuario logeado 
  const dataUsuario = async () => {
    const email = user.email;    
    await getUsuario(email);    
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();          
  
  };

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
        <FormCart />
        <form onSubmit={handleSubmit} className="bg-zinc-300 p-6 rounded-lg shadow-2xl shadow-slate-700 w-full">                  
          <FormMedicacion onMedicationDataChange={handleMedicationDataChange} />
          <FormDescartable />
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
