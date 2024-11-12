// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCctW_Vx1x3RLLaBkjzHsoD_NrBkWjUmMw",
  authDomain: "netflix-da1f6.firebaseapp.com",
  projectId: "netflix-da1f6",
  storageBucket: "netflix-da1f6.appspot.com",
  messagingSenderId: "445991243403",
  appId: "1:445991243403:web:669090ce59d17aa6de4e8e",
  measurementId: "G-S2GTNVLMPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();