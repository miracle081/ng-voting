// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjW8bELlp3HkDvFw6yoI02M4eJaYD3NTY",
    authDomain: "ng-voting-ab108.firebaseapp.com",
    projectId: "ng-voting-ab108",
    storageBucket: "ng-voting-ab108.firebasestorage.app",
    messagingSenderId: "927565263151",
    appId: "1:927565263151:web:4595a9e43908da0375b1da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);