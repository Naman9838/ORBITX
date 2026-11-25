import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBIWRBqmuQajX21_EZ8DZ0sAFp5b0qC8CY",
  authDomain: "practice-87b49.firebaseapp.com",
  projectId: "practice-87b49",
  storageBucket: "practice-87b49.firebasestorage.app",
  messagingSenderId: "496972025442",
  appId: "1:496972025442:web:9a231fb6cd3a9b00328b3b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 