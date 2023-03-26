// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, collection, getDocs } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDX5VL5WNPvPSYDN4z5fPqCcJkVhnrQEI",
  authDomain: "mern-netflix-19935.firebaseapp.com",
  projectId: "mern-netflix-19935",
  storageBucket: "mern-netflix-19935.appspot.com",
  messagingSenderId: "1089348925869",
  appId: "1:1089348925869:web:e75a81d4ed7ae08e170924",
  measurementId: "G-MKSN9ENN46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//const storage = getFirestore(app);
const storage = getStorage();

export default storage;