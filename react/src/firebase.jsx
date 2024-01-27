import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
console.log(firebaseConfig);
export const app = initializeApp(firebaseConfig);
