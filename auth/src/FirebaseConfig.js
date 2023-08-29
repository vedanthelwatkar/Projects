import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeMopWfLyjpagZsFMC48-Oz7gYDUjz88I",
  authDomain: "docgpt-c4f84.firebaseapp.com",
  databaseURL: "https://docgpt-c4f84-default-rtdb.firebaseio.com",
  projectId: "docgpt-c4f84",
  storageBucket: "docgpt-c4f84.appspot.com",
  messagingSenderId: "404887318435",
  appId: "1:404887318435:web:b44df8233b78a231bdb416"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app) // Initialize the auth object

export { auth };
export default app;