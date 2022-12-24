import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDNuV0Naqam_TiqFlWkMOq_PWZZ_Xh2xvg",
    authDomain: "controlgastos-de86b.firebaseapp.com",
    projectId: "controlgastos-de86b",
    storageBucket: "controlgastos-de86b.appspot.com",
    messagingSenderId: "819748194465",
    appId: "1:819748194465:web:c57e38073663d50f7988e0",
    measurementId: "G-QXNYJ44HEB"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);