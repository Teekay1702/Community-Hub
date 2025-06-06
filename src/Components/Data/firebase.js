// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMOM9CIBb70Trrp9VAgnlIV7Ttg8S0Xvg",
  authDomain: "community-hub-5ff53.firebaseapp.com",
  projectId: "community-hub-5ff53",
  storageBucket: "community-hub-5ff53.firebasestorage.app",
  messagingSenderId: "618937135585",
  appId: "1:618937135585:web:1a5c7d89915b5f33cb62a0",
  measurementId: "G-Z954G5R43T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)