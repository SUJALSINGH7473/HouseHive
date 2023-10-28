// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "house-hive.firebaseapp.com",
  projectId: "house-hive",
  storageBucket: "house-hive.appspot.com",
  messagingSenderId: "1062032350695",
  appId: "1:1062032350695:web:eca5ade500f40ec84eb142"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);