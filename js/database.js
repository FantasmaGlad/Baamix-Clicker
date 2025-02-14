<file>
// database.js - Firebase database interactions

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update } from 'firebase/database';

// Firebase configuration - Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save user data to Firebase
async function sauvegarderDonneesUtilisateur(uid, donnees) {
  try {
    const reference = ref(database, `utilisateurs/${uid}`);
    await set(reference, donnees);
    console.log('User data saved successfully to Firebase.');
  } catch (error) {
    console.error('Error saving user data to Firebase:', error);
    // Consider more robust error handling: retry mechanism, user notification
    throw new Error('Failed to save data to Firebase.');
  }
}

// Function to load user data from Firebase
async function chargerDonneesUtilisateur(uid) {
  try {
    const reference = ref(database, `utilisateurs/${uid}`);
    const snapshot = await get(reference);
    if (snapshot.exists()) {
      console.log('User data loaded successfully from Firebase.');
      return snapshot.val();
    } else {
      console.log('No data found for user in Firebase.');
      return null; // Or return a default data object
    }
  } catch (error) {
    console.error('Error loading user data from Firebase:', error);
    // Handle load errors gracefully, possibly return default local data
    return null;
  }
}

// Function to update user data in Firebase
async function mettreAJourDonneesUtilisateur(uid, nouvellesDonnees) {
  try {
    const reference = ref(database, `utilisateurs/${uid}`);
    await update(reference, nouvellesDonnees);
    console.log('User data updated successfully in Firebase.');
  } catch (error) {
    console.error('Error updating user data in Firebase:', error);
    // Handle update errors, possibly retry or notify user
    throw new Error('Failed to update data in Firebase.');
  }
}

export {
  sauvegarderDonneesUtilisateur,
  chargerDonneesUtilisateur,
  mettreAJourDonneesUtilisateur,
  database, // Export database instance if needed elsewhere
};
