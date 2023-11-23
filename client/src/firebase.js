import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDpPvrPWXa--7ChAMUT7fPEIHh2qHTA4bk",
  authDomain: "vtube-1f71b.firebaseapp.com",
  projectId: "vtube-1f71b",
  storageBucket: "vtube-1f71b.appspot.com",
  messagingSenderId: "431271262357",
  appId: "1:431271262357:web:d8cb9aff7608a8dc65839c"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app
