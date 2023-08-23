import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBnvM47d3HKENMcHi_LTKj5xd50KBNwlak",
  authDomain: "bigmart-e5f50.firebaseapp.com",
  projectId: "bigmart-e5f50",
  storageBucket: "bigmart-e5f50.appspot.com",
  messagingSenderId: "813084011243",
  appId: "1:813084011243:web:74c645b5f6a8fc8718ecae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app