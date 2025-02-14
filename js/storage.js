<file>
// storage.js - Handles saving and loading game data to local storage

const STORAGE_KEY = 'baamixClickerData';

// Save game data to local storage
export function saveGameData(data) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
    console.log('Game data saved to local storage at', new Date().toLocaleTimeString()); // Added timestamp to log
  } catch (error) {
    console.error('Error saving game data to local storage:', error);
    // Consider implementing a more visible user notification in case of save failure
  }
}

// Load game data from local storage
export function loadGameData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      console.log('Game data loaded from local storage.');
      return parsedData;
    }
    console.log('No saved game data found in local storage.'); // Log when no data is found
    return null;
  } catch (error) {
    console.error('Error loading game data from local storage:', error);
    return null; // Return null to start a new game if loading fails
  }
}
</file>
