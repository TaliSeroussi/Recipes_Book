// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVwe4L1z0gUtge7MEKE53Z2dEUCWkBkz4",
  authDomain: "recipes-book-1a026.firebaseapp.com",
  projectId: "recipes-book-1a026",
  storageBucket: "recipes-book-1a026.appspot.com",
  messagingSenderId: "361675788534",
  appId: "1:361675788534:web:6e89ed06ab15ea25251cd7",
  measurementId: "G-LYX30ZWGZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;