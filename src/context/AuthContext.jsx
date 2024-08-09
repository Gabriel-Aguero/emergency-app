import { useState, createContext, useEffect } from 'react';
import { auth, db, } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, getDoc, doc } from "firebase/firestore";

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
  
    // Si el servicio existe, devolver su nombre para posteriormente agregarlo al usuario
    if (!serviceSnapshot.empty) {
      const servicio = serviceSnapshot.docs[0];      
      return servicio.data().nombre;
    }
  
    // Si el servicio no existe, agregarlo a la colección servicio y devulvo el nombre para posteriormente agregarlo al perfil del usuario
    const newServiceRef = await addDoc(collection(db, 'servicio'), { nombre: serviceName });
    return newServiceRef.id;
  };

  const getUsuario = async (uid) => {

    const userQuery = query(collection(db, 'usuario'), where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };       
    } else {
      console.log('No hay usuario con ese correo');
      return null;
    }
  };


  const addProfileUser = ({uid, firstName, lastName, legajo, email, servicio}) => {
    addDoc(collection(db, 'usuario'), {      
      uid,
      firstName,
      lastName,
      legajo,
      email,
      servicio
    });    
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {              
      setUser({
        uid: user.uid,
        email: user.email,          
      });   
      setLoading(false);
    } else {
      setUser(null);
    }
  });   
  return unsubscribe;
}, []);
  
  return (
    <AuthContext.Provider value={{ signup, login, logout, user, loading, addProfileUser, checkAndAddService, getUsuario }}>
      {children}
    </AuthContext.Provider>
  )
} 



