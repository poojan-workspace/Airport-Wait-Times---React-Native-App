// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0bn2BDyQGSFGWiC5bwMV96hM-g-VpaqA",
  authDomain: "portex-c2cc7.firebaseapp.com",
  projectId: "portex-c2cc7",
  storageBucket: "portex-c2cc7.firebasestorage.app",
  messagingSenderId: "793497013867",
  appId: "1:793497013867:web:bddfde9d7664467ae72b2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
