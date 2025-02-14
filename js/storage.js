// storage.js - Handles saving and loading game data to local storage

const STORAGE_KEY = 'baamixClickerData';

// Save game data to local storage
export function saveGameData(data) {
  try {
    if (typeof data !== 'object' || data === null) {
      throw new Error('Invalid data format. Expected an object.');
    }
    const serializedData = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serializedData);
    console.log('Game data saved to local storage at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Error saving game data to local storage:', error);
    // Optionally, you can add user notifications here for better feedback
  }
}

// Load game data from local storage
export function loadGameData() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      if (typeof parsedData !== 'object' || parsedData === null) {
        throw new Error('Loaded data is not a valid object.');
      }
      console.log('Game data loaded from local storage.');
      return parsedData;
    }
    console.log('No saved game data found in local storage.');
    return null;
  } catch (error) {
    console.error('Error loading game data from local storage:', error);
    return null; // Return null to start a new game if loading fails
  }
}
