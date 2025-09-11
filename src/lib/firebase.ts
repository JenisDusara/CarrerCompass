
import { initializeApp, getApp, getApps, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  "projectId": "careercompass-xhdcy",
  "appId": "1:883520662769:web:5cea175734f18d4a110d50",
  "storageBucket": "careercompass-xhdcy.firebasestorage.app",
  "apiKey": "AIzaSyBq3LmgBpLxhOipoGVCfIn1TZZRrO-hV4o",
  "authDomain": "careercompass-xhdcy.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "883520662769"
};

// Initialize Firebase for client side
function getFirebaseApp(): FirebaseApp {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

const app = getFirebaseApp();

export { app, firebaseConfig };
