import { useState, createContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  const checkAndAddService = async (servicioName) => {
    // Crear una consulta para buscar el servicio por nombre
    const serviceQuery = query(
      collection(db, "servicio"),
      where("nombre", "==", servicioName)
    );
    const serviceSnapshot = await getDocs(serviceQuery);

    // Si el servicio existe, devolver su nombre para posteriormente agregarlo al usuario
    if (!serviceSnapshot.empty) {
      const servicio = serviceSnapshot.docs[0];
      return servicio.data().nombre;
    }

    // Si el servicio no existe, agregarlo a la colección servicio y devuelvo el nombre para posteriormente agregarlo al perfil del usuario
    const newServiceRef = await addDoc(collection(db, "servicio"), {
      nombre: servicioName,
    });
    return newServiceRef.nombre;
  };

  const getUsuario = async (email) => {
    const q = query(collection(db, "usuario"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUsuario(doc.data());
    });
  };

  // Agrego datos extras a la tabla usuario
  const addProfileUser = ({
    uid,
    firstName,
    lastName,
    legajo,
    email,
    servicioName,
  }) => {
    addDoc(collection(db, "usuario"), {
      uid,
      firstName,
      lastName,
      legajo,
      email,
      servicioName,
    });
  };

  // Agrego datos a la tabla carro
  const addCarro = async ({
    numCarro,
    precinto,
    cantidadCarros,
    fecha_inicio,
    fecha_ultimo_control,
    servicioName,
  }) => {
    try {
      const docRef = await addDoc(collection(db, "carro"), {
        numCarro,
        precinto,
        cantidadCarros,
        fecha_inicio,
        fecha_ultimo_control,
        servicioName,
      });
      return docRef.id;
    } catch (error) {
      console.log(error);
    }
  };

  // Agrego datos a la tabla medicacion
  const addMedication = async ({
    idCarro,
    medication,
    lot,
    medExpiration,
    medQuantity,
  }) => {
    try {
      const docRef = await addDoc(collection(db, "medicacion"), {
        idCarro,
        medication,
        lot,
        medExpiration,
        medQuantity,
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  // Agrego datos a la tabla descartable
  const addDescartable = async ({
    idCarro,
    material,
    lot,
    matExpiration,
    matQuantity,
  }) => {
    try {
      const docRef = await addDoc(collection(db, "descartable"), {
        idCarro,
        material,
        lot,
        matExpiration,
        matQuantity,
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
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
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        user,
        loading,
        addProfileUser,
        checkAndAddService,
        getUsuario,
        usuario,
        addCarro,
        addMedication,
        addDescartable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
