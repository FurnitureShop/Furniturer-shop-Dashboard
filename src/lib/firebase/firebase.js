// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEgwndp4mZpcmR3qOfI5ddAbV3Q4bE7kU",
    authDomain: "web-furniture-sale.firebaseapp.com",
    projectId: "web-furniture-sale",
    storageBucket: "web-furniture-sale.appspot.com",
    messagingSenderId: "896346999087",
    appId: "1:896346999087:web:81760d49557bad8ac539da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);