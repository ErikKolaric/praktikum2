import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC66AuMn_CDUwmRuQlM-2NMAO_YGiBIUSw",
  authDomain: "barber-shop-f93f9.firebaseapp.com",
  projectId: "barber-shop-f93f9",
  storageBucket: "barber-shop-f93f9.appspot.com",
  messagingSenderId: "726274097890",
  appId: "1:726274097890:web:883bb970ae99f3b5d8d4bb",
  measurementId: "G-WJRDR72L86"
};

const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;