// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTjHD48X6LoQaYrRJv_cDw7kI7WG8qXnw",
  authDomain: "diary-22693.firebaseapp.com",
  projectId: "diary-22693",
  storageBucket: "diary-22693.appspot.com",
  messagingSenderId: "584490604982",
  appId: "1:584490604982:web:3de75b8d885a530ea60917"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

