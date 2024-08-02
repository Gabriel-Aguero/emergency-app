import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [legajo, setLegajo] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos adicionales en Firestore
      await addDoc(collection(db, 'usuarios'), {
        uid: user.uid,
        firstName,
        lastName,
        legajo,
        email
      });

      console.log("User registered and data saved in Firestore");
    } catch (error) {
      console.error("Error registering user: ", error);
    }   
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500'>
      <h1 className='text-4xl font-bold text-white mb-8'>Emergency Card</h1>
      <div className='flex flex-col gap-4 items-center justify-center w-full max-w-md p-6 bg-white border-2 border-purple-700 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-purple-800'>Registrarse</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
          <input 
            className='border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800' 
            type="text" 
            name='firstName'
            placeholder='Nombre' 
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            className='border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800' 
            type="text" 
            name='lastName'
            placeholder='Apellido' 
            onChange={(e) => setLastName(e.target.value)}
          />
          <input 
            className='border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800' 
            type="text" 
            name='legajo'
            placeholder='Legajo' 
            onChange={(e) => setLegajo(e.target.value)}
          />
          <input 
            className='border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800' 
            type="email" 
            name='email' 
            placeholder='correo@site.com' 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className='border-2 border-purple-600 rounded-lg p-2 w-full focus:outline-none focus:border-purple-800' 
            type="password" 
            name='password' 
            placeholder='Contraseña' 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-purple-700 text-white rounded-lg p-2 hover:bg-purple-800 transition duration-200'>Registrarse</button>
        </form>
        <button className='bg-purple-700 text-white rounded-lg p-2 mt-2 hover:bg-purple-800 transition duration-200' onClick={() => navigate('/')}>Ir a Login</button>
      </div>
    </div>
  )
}

export default Register
