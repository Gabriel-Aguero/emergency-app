/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,  
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usuario, setUsuario] = useState({});
  const [loading, setLoading] = useState(true);
  const [carros, setCarros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [medications, setMedications] = useState([]);
  const [descartables, setDescartables] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Escucha cambios en la autenticación
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
      setIsAuthenticated(true); // Establecer autenticación como verdadera
    }
  }, []);

  // Crear un usuario en Firebase
  const signup = async (
    email,
    password,
    firstName,
    lastName,
    servicioName,
    legajo
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Agregar datos a la tabla usuario
      await setDoc(doc(db, "usuario", user.uid), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        legajo: legajo,
        servicioName: servicioName,
      });

      return user;
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  // Iniciar sesión en Firebase
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const q = query(collection(db, "usuario"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const usuarioCompleto = { ...user, ...userData };
        setUsuario(usuarioCompleto);
        localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
        setIsAuthenticated(true);
        return usuarioCompleto;
      } else {
        throw new Error("No se encontraron datos adicionales del usuario.");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  // Restablecer la contraseña
  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // Cerrar sesión en Firebase
  const logout = async () => {
    try {
     await signOut(auth);
      setUsuario(null);
      setIsAuthenticated(false);
      localStorage.removeItem("usuario");      
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  // Verificar si el servicio existe en la colección servicio
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

  // Obtener el usuario por email
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
    precintoMedicacion,
    precintoDescartable,
    fechaInicio,
    fechaUltimoControl,
    servicioName,
  }) => {
    try {
      const docRef = await addDoc(collection(db, "carro"), {
        numCarro,
        precintoMedicacion,
        precintoDescartable,
        fechaInicio,
        fechaUltimoControl,
        servicioName,
      });

      // Crea un objeto con el nuevo carro y su ID
      const newCarro = {
        id: docRef.id, // Usa el ID generado por Firestore
        numCarro,
        precintoMedicacion,
        precintoDescartable,
        fechaInicio,
        fechaUltimoControl,
        servicioName,
      };

      // Actualiza el estado de los carros
      setCarros((prevCarros) => [...prevCarros, newCarro]);

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

  // Obtener los servicios
  const getServicio = async () => {
    const servicioSnapshot = await getDocs(collection(db, "servicio"));
    const serviciosList = servicioSnapshot.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
    }));
    setServicios(serviciosList);
  };

  // Recuperar el listado de carros segun el servicio
  const getCarrosByServicio = async (servicioName) => {
    try {
      const q = query(
        collection(db, "carro"),
        where("servicioName", "==", servicioName)
      );
      const querySnapshot = await getDocs(q);
      const carrosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        numCarro: doc.data().numCarro,
        precintoMedicacion: doc.data().precintoMedicacion,
        precintoDescartable: doc.data().precintoDescartable,
        fechaInicio: doc.data().fechaInicio,
        fechaUltimoControl: doc.data().fechaUltimoControl,
        servicioName: doc.data().servicioName,
      }));
      setCarros(carrosList); // Actualiza el estado de los carros
    } catch (error) {
      console.error("Error al obtener los carros:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  // Obtener los medicamentos por el carro
  const getMedicationByCarro = async (idCarro) => {
    const q = query(
      collection(db, "medicacion"),
      where("idCarro", "==", idCarro)
    );
    const querySnapshot = await getDocs(q);
    const medicationsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      idCarro: doc.data().idCarro,
      medication: doc.data().medication,
      lot: doc.data().lot,
      medExpiration: doc.data().medExpiration,
      medQuantity: doc.data().medQuantity,
    }));
    setMedications(medicationsList);
  };

  // Obtener los descartables por el carro
  const getDescartableByCarro = async (idCarro) => {
    const q = query(
      collection(db, "descartable"),
      where("idCarro", "==", idCarro)
    );
    const querySnapshot = await getDocs(q);
    const descartablesList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      idCarro: doc.data().idCarro,
      material: doc.data().material,
      lot: doc.data().lot,
      matExpiration: doc.data().matExpiration,
      matQuantity: doc.data().matQuantity,
    }));
    setDescartables(descartablesList);
  };

  // Actualiza los datos del carro
  const updateCarro = async (data, idCarro) => {
    const docRef = doc(db, "carro", idCarro);
    await updateDoc(docRef, {
      numCarro: data.numCarro,
      precintoMedicacion: data.precintoMedicacion,
      precintoDescartable: data.precintoDescartable,
      fechaInicio: data.fechaInicio,
      fechaUltimoControl: data.fechaUltimoControl,
    });
    return docRef;
  };

  // Función para eliminar un carro
  const deleteCarro = async (idCarro) => {
    try {
      // Elimina el carro de Firestore
      await deleteDoc(doc(db, "carro", idCarro));

      // Actualiza el estado de los carros
      setCarros((prevCarros) =>
        prevCarros.filter((carro) => carro.id !== idCarro)
      );
    } catch (error) {
      console.error("Error al eliminar el carro:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  };

  // Actualizar la lista de medicaciones
  const updateMedication = async (data, medicationId) => {
    try {
      const docRef = doc(db, "medicacion", medicationId);
      await updateDoc(docRef, {
        idCarro: data.idCarro,
        medication: data.medication,
        lot: data.lot,
        medQuantity: data.medQuantity,
        medExpiration: data.medExpiration,
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  // Actualizar la lista de descartables
  const updateDescartable = async (data, descartableId) => {
    try {
      const docRef = doc(db, "descartable", descartableId);
      await updateDoc(docRef, {
        idCarro: data.idCarro,
        material: data.material,
        lot: data.lot,
        matQuantity: data.matQuantity,
        matExpiration: data.matExpiration,
      });
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  // Eliminar un elemento de lista de medicaciones
  const deleteMedication = async (medicationId) => {
    const docRef = doc(db, "medicacion", medicationId);
    await deleteDoc(docRef);
  };

  // Eliminar un elemento de lista de descartables
  const deleteDescartable = async (descartableId) => {
    const docRef = doc(db, "descartable", descartableId);
    await deleteDoc(docRef);
  };

  // Función para obtener el token del usuario
  const getIdToken = async () => {
    if (user) {
      const idToken = await user.getIdToken();
      return idToken;
    }
    return null;
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
        isAuthenticated,
        user,
        loading,
        usuario,
        carros,
        servicios,
        medications,
        descartables,
        addProfileUser,
        checkAndAddService,
        resetPassword,
        getUsuario,
        addCarro,
        addMedication,
        addDescartable,
        getCarrosByServicio,
        getServicio,
        getMedicationByCarro,
        getDescartableByCarro,
        updateCarro,
        deleteCarro,
        updateMedication,
        updateDescartable,
        deleteMedication,
        deleteDescartable,
        getIdToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
