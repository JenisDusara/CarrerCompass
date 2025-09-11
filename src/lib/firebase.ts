
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "careercompass-xhdcy",
  "appId": "1:883520662769:web:5cea175734f18d4a110d50",
  "storageBucket": "careercompass-xhdcy.firebasestorage.app",
  "apiKey": "AIzaSyBq3LmgBpLxhOipoGVCfIn1TZZRrO-hV4o",
  "authDomain": "careercompass-xhdcy.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "883520662769"
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);

export { app, auth };
