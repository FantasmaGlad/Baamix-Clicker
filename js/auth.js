<file>
// auth.js - User authentication with Google Firebase

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-in function
async function connexionGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User connected with Google:', result.user);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    // Improve error handling: show user-friendly message, retry logic, etc.
    throw new Error('Failed to sign in with Google.');
  }
}

// User Sign-out function
async function deconnexionUtilisateur() {
  try {
    await signOut(auth);
    console.log('User signed out.');
    // Additional sign-out logic (e.g., clear local storage, redirect) can be added here
  } catch (error) {
    console.error('Sign-out error:', error);
    // Handle sign-out errors gracefully, possibly inform user
    throw new Error('Failed to sign out.');
  }
}

export { connexionGoogle, deconnexionUtilisateur, auth };
</file>
