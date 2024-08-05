import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  { loading ? <h1>Cargando...</h1> : null }
  if(!user) { return <Navigate to="/" /> }

  return children;      
}  