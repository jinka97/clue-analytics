import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration (replace with your config from Firebase Console)


const firebaseConfig = {
  apiKey: "AIzaSyDeB--hM17rnRaXoi4hPKqS7pC8DPqvYys",
  authDomain: "clue-analytics.firebaseapp.com",
  databaseURL: "https://clue-analytics-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clue-analytics",
  storageBucket: "clue-analytics.firebasestorage.app",
  messagingSenderId: "571463859307",
  appId: "1:571463859307:web:ce3c852fd7afc6a710452e",
  measurementId: "G-98SPL77FT1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);
const analytics = getAnalytics(app);

export { app, auth, functions, analytics };
