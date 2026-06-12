// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqdGxujfeLZTVk-te3wXlgu-wTw4aQhfU",
  authDomain: "mi-ecommerce-react-be3f2.firebaseapp.com",
  projectId: "mi-ecommerce-react-be3f2",
  storageBucket: "mi-ecommerce-react-be3f2.firebasestorage.app",
  messagingSenderId: "771202125192",
  appId: "1:771202125192:web:0f92491d00a7daef03fe3d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)