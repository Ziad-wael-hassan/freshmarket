import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Placeholder configuration - replace with real Firebase keys or set them in .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

console.log('Firebase Config Check:', {
  apiKey: firebaseConfig.apiKey ? 'Present' : 'MISSING',
  projectId: firebaseConfig.projectId ? 'Present' : 'MISSING',
  authDomain: firebaseConfig.authDomain ? 'Present' : 'MISSING'
});

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

console.log('Firebase Initialized Successfully');

// Ensure the user always gets to select an account rather than auto-login if they have multiple
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
