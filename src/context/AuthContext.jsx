import { useState, createContext, useEffect } from 'react';
import { auth, db, } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ( { children } ) => {

  const [user, setUser] = useState(null)  
  const [loading, setLoading] = useState(true)

  const signup = async (email, password) => {    
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);    
   return userCredential;
  };
  
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };  
 
  const checkAndAddService = async (serviceName) => {
    // Crear una consulta para buscar el servicio por nombre
    const serviceQuery = query(collection(db, 'servicio'), where('nombre', '==', serviceName));
    const serviceSnapshot = await getDocs(serviceQuery);
  
    // Si el servicio existe, devolver su id para posteriormente agregarlo al usuario
    if (!serviceSnapshot.empty) {
      const servicio = serviceSnapshot.docs[0];
      return servicio.id;
    }
  
    // Si el servicio no existe, agregarlo a la colección servicio y devolver el nuevo id para posteriormente agregarlo al usuario
    const newServiceRef = await addDoc(collection(db, 'servicio'), { nombre: serviceName });
    return newServiceRef.id;
  };


  const addProfileUser = ({uid, firstName, lastName, legajo, email, servicioId}) => {
    addDoc(collection(db, 'usuario'), {      
      uid,
      firstName,
      lastName,
      legajo,
      email,
      servicioId
    });    
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);   
        setLoading(false);
      } else {
        setUser(null);
      }
    });   
    return unsubscribe;
  }, []);
  
  return (
    <AuthContext.Provider value={{ signup, login, logout, user, loading, addProfileUser, checkAndAddService }}>
      {children}
    </AuthContext.Provider>
  )
} 
