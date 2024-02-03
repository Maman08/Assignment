// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG_QNq-DgqUICtvutzR49ZVrGIjhZvAqU",
  authDomain: "raectaauth.firebaseapp.com",
  projectId: "raectaauth",
  storageBucket: "raectaauth.appspot.com",
  messagingSenderId: "214621623051",
  appId: "1:214621623051:web:7c9566d5fd7e76930b880e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app);