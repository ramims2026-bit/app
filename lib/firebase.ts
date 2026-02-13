import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJtctJALFhWbYXQSeGaT-0Ewr_aONZhaU",
  authDomain: "rami-it.firebaseapp.com",
  projectId: "rami-it",
  storageBucket: "rami-it.firebasestorage.app",
  messagingSenderId: "796181594095",
  appId: "1:796181594095:web:46d5ed6bd44c677cc1401a",
  measurementId: "G-DRH16ZP7S1"
};

// ב-Cloudflare Pages/Edge, אנחנו מאתחלים רק אם אנחנו בסביבת לקוח או סביבה שתומכת ב-SDK
const app = typeof window !== "undefined" || process.env.NODE_ENV === "development"
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

export const db = app ? getFirestore(app) : null;
export const auth = app ? getAuth(app) : null;
export { app };
