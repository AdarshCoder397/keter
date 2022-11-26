import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZlIKSLb8pJr6FV4bQzBXcu_2hlEQ5BjQ",
    authDomain: "keter-2cef0.firebaseapp.com",
    projectId: "keter-2cef0",
    storageBucket: "keter-2cef0.appspot.com",
    messagingSenderId: "494030658157",
    appId: "1:494030658157:web:dbd739fc7afd4d4623bd64",
    measurementId: "G-H84TXTXN9Z"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) 
export const db = getFirestore(app);
