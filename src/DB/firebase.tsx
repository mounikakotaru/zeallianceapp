import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apikey = import.meta.env.VITE_NOTAPI_KEY;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: "zealianceapp.firebaseapp.com",
  projectId: "zealianceapp",
  storageBucket: "zealianceapp.firebasestorage.app",
  messagingSenderId: "725641921403",
  appId: "1:725641921403:web:6fd198f874e8048797f3de",
  measurementId: "G-MR4SCXGDSR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);          
const db = getDatabase(app);        
const fdb = getFirestore(app);      

export { auth, db, fdb };
