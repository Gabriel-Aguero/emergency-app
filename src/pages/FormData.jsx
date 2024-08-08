import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormMedicacion from '../components/FormMedicacion';
import FormDescartable from '../components/FormDescartable';

const FormData = () => {
  // const [medication, setMedication] = useState('');
  // const [lot, setLot] = useState('');
  // const [medExpiration, setMedExpiration] = useState('');
  // const [medQuantity, setMedQuantity] = useState('');
  // const [material, setMaterial] = useState('');
  // const [matExpiration, setMatExpiration] = useState('');
  // const [matQuantity, setMatQuantity] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout(); 
    navigate('/');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // // Aquí puedes manejar el envío de datos, por ejemplo, enviándolos a una base de datos.
    // console.log({
    //   medication,
    //   lot,
    //   medExpiration,
    //   medQuantity,
    //   material,
    //   matExpiration,
    //   matQuantity
    // });
  };

  useEffect(() => {
    if (user) {
      navigate('/formulario_de_datos');
    }
  }, [ user ]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">     
      <div className='flex flex-col justify-center items-center gap-4'>
        <h1 className="w-full flex justify-center align-center flex-wrap text-4xl font-bold text-blue-600">Bienvenido</h1>             
        <span className='text-2xl font-bold text-blue-500'>{user.email}</span>
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Completa el formulario de datos</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        {/* <div className="mb-6">
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
        </div> */}

        {/* <div className="mb-6">
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
        </div> */}
        <FormMedicacion />
        <FormDescartable />
        <div className='flex items-center justify-center gap-4'>
          <button type="submit" className="w-36 bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition duration-200">
            Enviar
          </button>
          <button onClick={handleLogout} className="w-36 bg-red-500 text-white rounded-md p-2 hover:bg-red-700 transition duration-200">
            Cerrar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormData;
