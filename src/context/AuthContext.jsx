import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 

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

  const addProfileUser = ({uid, firstName, lastName, legajo, email}) => {
    return addDoc(collection(db, 'usuarios'), {      
      uid,
      firstName,
      lastName,
      legajo,
      email
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
    <AuthContext.Provider value={{ signup, login, logout, user, loading, addProfileUser }}>
      {children}
    </AuthContext.Provider>
  )
}
