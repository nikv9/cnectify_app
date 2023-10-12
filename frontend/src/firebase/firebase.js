import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbGHqG4NgfqPJM2kPuStNv-4RYrZdtcQs",
  authDomain: "social-verse-q.firebaseapp.com",
  projectId: "social-verse-q",
  storageBucket: "social-verse-q.appspot.com",
  messagingSenderId: "829573721776",
  appId: "1:829573721776:web:2eedddaa1856877229d575",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
