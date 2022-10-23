import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJN7K-bizM9TEtbuLxhmNUgN6xK_XqrPk",
  authDomain: "free-hiit-app.firebaseapp.com",
  projectId: "free-hiit-app",
  storageBucket: "free-hiit-app.appspot.com",
  messagingSenderId: "1019582462722",
  appId: "1:1019582462722:web:61383d27e9a99d79d0601b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()