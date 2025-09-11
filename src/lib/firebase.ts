
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

let app: FirebaseApp;
let auth: Auth;

function getFirebaseApp() {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    return app;
}


function getFirebaseAuth() {
    if (!auth) {
        auth = getAuth(getFirebaseApp());
    }
    return auth;
}

export { getFirebaseApp, getFirebaseAuth };
