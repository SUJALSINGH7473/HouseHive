// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getMessaging} from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmX5QAKiWfGuh-9RcQgpAQu5o8lmEkhz4',
  authDomain: "house-hive.firebaseapp.com",
  projectId: "house-hive",
  storageBucket: "house-hive.appspot.com",
  messagingSenderId: "1062032350695",
  appId: "1:1062032350695:web:eca5ade500f40ec84eb142"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);