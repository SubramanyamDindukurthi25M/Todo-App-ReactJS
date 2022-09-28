import {
    initializeApp
} from "firebase/app";
import {
    getFirestore
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYTYI9KLlZqwF3zQlx7PNkQpPO1aATKmM",
    authDomain: "first-todo-app-rj.firebaseapp.com",
    projectId: "first-todo-app-rj",
    storageBucket: "first-todo-app-rj.appspot.com",
    messagingSenderId: "486492622368",
    appId: "1:486492622368:web:4d3026bec16bf72b0a7645"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);