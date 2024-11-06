// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAohxHqd9GCCMvHuADErAJvQrwAtPoOvHM",
  authDomain: "aidventure-a430f.firebaseapp.com",
  projectId: "aidventure-a430f",
  storageBucket: "aidventure-a430f.firebasestorage.app",
  messagingSenderId: "795033700053",
  appId: "1:795033700053:web:7bbfca7a685a06cd93845c",
  measurementId: "G-2FHHC7KZRQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
