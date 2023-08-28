// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "next-crud-1f611.firebaseapp.com",
  projectId: "next-crud-1f611",
  storageBucket: "next-crud-1f611.appspot.com",
  messagingSenderId: "669633234183",
  appId: "1:669633234183:web:6243efae9add62dbf631a2",
  measurementId: "G-XV35KN5DG4"
};

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();


