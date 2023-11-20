import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyD55D98aJdM6dFQxYbZc5C3vvV4NCr43jQ",
    authDomain: "vtube-32098.firebaseapp.com",
    projectId: "vtube-32098",
    storageBucket: "vtube-32098.appspot.com",
    messagingSenderId: "176642390893",
    appId: "1:176642390893:web:3b5b605576c990a869f864"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app