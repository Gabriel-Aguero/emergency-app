import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
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
            onChange={(e)=>setEmail(e.target.value)}
          />
          <input 
            type="password" 
            name='password' 
            placeholder='Ingresa tu contrasena' 
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button>Login</button>          
        </form>        
        <button onClick={register}>Registrarme</button>
    </div>
  );
};

export default Login

