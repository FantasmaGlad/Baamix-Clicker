// storage.js - Handles saving and loading game data

export function saveGameData(data) {
  localStorage.setItem('baamixClickerData', JSON.stringify(data));
}

export function loadGameData() {
  const data = localStorage.getItem('baamixClickerData');
  return data ? JSON.parse(data) : null;
}

// You might add Firebase integration here later
