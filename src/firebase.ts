import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: "uber-clone-bd051.firebaseapp.com",
  projectId: "uber-clone-bd051",
  storageBucket: "uber-clone-bd051.appspot.com",
  messagingSenderId: "913160782043",
  appId: "1:913160782043:web:2672ffa7b38a42017f8cfe"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
