import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, Analytics } from 'firebase/analytics';

// Firebase configuration
// Find these values in Firebase Console: Project Settings > General > Your apps > Web app
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
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const functions: Functions = getFunctions(app);
const analytics: Analytics = getAnalytics(app);

export { app, auth, functions, analytics };
