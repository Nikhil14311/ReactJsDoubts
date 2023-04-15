import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2KLRhggW7uAdSvySrSElodIgx_LQa9Rc",
  authDomain: "charankaranamportfolio.firebaseapp.com",
  projectId: "charankaranamportfolio",
  storageBucket: "charankaranamportfolio.appspot.com",
  messagingSenderId: "36584780712",
  appId: "1:36584780712:web:90a5edf8ae649dfac7239d",
  measurementId: "G-ZGZGLK6SDZ"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app,auth,db};
