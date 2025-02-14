<file>
// main.js - Core game logic and initialization

import { updateScore, updateBaamixPerSecond, updateFactories, updateQuests } from './dom.js';
import { factories, calculateTotalProduction, buyFactory } from './factories.js';
import { quests, checkQuestCompletion, loadQuests, saveQuests } from './quests.js'; // Import quest save/load functions
import { loadGameData, saveGameData } from './storage.js';
import { setupMenu } from './menu.js';

let points = 0;
let baamixPerSecond = 0;
let gameLoopInterval; // Variable to hold the game loop interval

// Function to increment points on click
function incrementPoints() {
  points++;
  updateScore(points);
  checkQuestCompletion(points); // Check quests on click
}

// Calculate and update Baamix per second
function calculateBaamixPerSecond() {
  baamixPerSecond = calculateTotalProduction(factories);
  updateBaamixPerSecond(baamixPerSecond);
}

// Update all UI elements
function updateUI() {
  updateScore(points);
  updateBaamixPerSecond(baamixPerSecond);
  updateFactories(factories, points);
  updateQuests(quests);
}

// Main game loop - runs every second
function gameLoop() {
  points += baamixPerSecond;
  updateUI();
  saveGameData({ points, factories, quests }); // Save game state every loop
}

// Initialize the game when the DOM is fully loaded
function initGame() {
  // Load saved game data from local storage
  const savedData = loadGameData();
  if (savedData) {
    points = savedData.points || 0;
    factories.forEach((factory, index) => { // Ensure factory quantities are loaded correctly
      factory.quantity = savedData.factories[index]?.quantity || 0;
      factory.cost = savedData.factories[index]?.cost || factory.cost; // Load cost as well
    });
    loadQuests(savedData.quests || quests); // Load quests or default quests if none saved
  }

  calculateBaamixPerSecond();
  updateUI();
  setupMenu();

  // Set up event listener for Baamix button click
  const baamixButton = document.getElementById('baamix-button');
  baamixButton.addEventListener('click', incrementPoints);

  // Event delegation for factory buttons (optimized event listener)
  const factoriesContainer = document.getElementById('factories-container'); // Add this line to get factoriesContainer
  factoriesContainer.addEventListener('click', handleFactoryClick);

  // Start the game loop interval
  if (!gameLoopInterval) { // Prevent multiple intervals from starting
    gameLoopInterval = setInterval(gameLoop, 1000);
  }
}

function handleFactoryClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const factoryId = parseInt(event.target.dataset.factoryId, 10);
    if (isNaN(factoryId)) return; // Exit if factoryId is not a number

    const purchaseResult = buyFactory(factoryId, points);
    if (purchaseResult.success) {
      points = purchaseResult.updatedPoints;
      calculateBaamixPerSecond();
      updateFactories(factories, points); // Update factories UI only
      updateScore(points); // Update score display
      saveGameData({ points, factories, quests }); // Save immediately after purchase
    } else {
      alert(purchaseResult.message); // User feedback for purchase failure
    }
  }
}


// Initialize game on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initGame);

// Export points and factories if needed for debugging or testing
export { points, factories, quests };
</file>
