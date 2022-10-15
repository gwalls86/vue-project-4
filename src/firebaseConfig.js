// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'; //Para autenticación
import { getFirestore } from 'firebase/firestore/lite'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdg6U0F9mfDAdDMil_SmoD2nKeao2dc0o",
  authDomain: "vue-project-4.firebaseapp.com",
  projectId: "vue-project-4",
  storageBucket: "vue-project-4.appspot.com",
  messagingSenderId: "924049579058",
  appId: "1:924049579058:web:b45475b9cb56e52677702b"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(); //Inicializa metodos para acceder a base de datos

export { auth , db };