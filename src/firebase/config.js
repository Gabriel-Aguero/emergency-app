import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYS3qUU7eB6gIonOywiB5UgQM6Cj9t5Hw",
  authDomain: "emergency-app-f10aa.firebaseapp.com",
  projectId: "emergency-app-f10aa",
  storageBucket: "emergency-app-f10aa.appspot.com",
  messagingSenderId: "366004690301",
  appId: "1:366004690301:web:cbf55b5a5d975b1ab1c014"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };