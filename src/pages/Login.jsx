import {  useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  
  const [user, setUser] = useState({
    email: '',    
    password: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();       

    try {
      await login(user.email, user.password);
      navigate('/formulario_de_datos');  
    } catch (error) {
      console.error("Error logging in: ", error); 
    }        
  }
    
  const register = () => {
    navigate('/register');
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>         
          <input 
            type="email"
            name='email' 
            placeholder='corre@site.com' 
            onChange={handleChange}
          />
          <input 
            type="password" 
            name='password' 
            placeholder='Ingresa tu contrasena' 
            onChange={handleChange}
          />
          <button>Ingresar</button>          
        </form>        
        <button onClick={register}>Registrarme</button>
    </div>
  );
};

export default Login

