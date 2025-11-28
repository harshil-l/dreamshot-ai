import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: "AIzaSyB9dg2odIwMkunLxrcjShqcuxpnP3ebQGk",
  authDomain: "dreamshot-40d9e.firebaseapp.com",
  projectId: "dreamshot-40d9e",
  storageBucket: "dreamshot-40d9e.firebasestorage.app",
  messagingSenderId: "437179498288",
  appId: "1:437179498288:web:353539faad4444ff2ed2f5",
  measurementId: "G-TEW0KG8QWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const googleAuthProvider = new GoogleAuthProvider();
// export const analytics =
//   typeof window !== "undefined" ? getAnalytics(app) : null;


export { auth, db, storage, googleAuthProvider, functions };