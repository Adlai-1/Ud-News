import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhqv3Q43i_8PKuxylK6ezqBPx0MbuISwc",
  authDomain: "testings-5619e.firebaseapp.com",
  projectId: "testings-5619e",
  storageBucket: "testings-5619e.appspot.com",
  messagingSenderId: "240131041170",
  appId: "1:240131041170:web:1a333a184bb4c7c5a8034b",
  measurementId: "G-3T373WLK5M",
};
//ExponentPushToken[nrm7IkM9KKkMsr4h42iNt4]
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);
