import firebase from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDFFubtiKbzevmaiB_Iqs-ypprURrKabVA",
  authDomain: "event-hosting-platform-demo.firebaseapp.com",
  projectId: "event-hosting-platform-demo",
  storageBucket: "event-hosting-platform-demo.appspot.com",
  messagingSenderId: "786959663437",
  appId: "1:786959663437:web:ca77a4f0362504bcd73704",
  measurementId: "G-VWJ8ZYNHQ5"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getFirestore(app);
