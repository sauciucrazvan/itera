// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDl2mKHG5tUxhtZc3zwOZ0P5L46BLS7TQ",
  authDomain: "bug-tracker-c6f79.firebaseapp.com",
  projectId: "bug-tracker-c6f79",
  storageBucket: "bug-tracker-c6f79.appspot.com",
  messagingSenderId: "91613453214",
  appId: "1:91613453214:web:5835d95e601283938b148f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
