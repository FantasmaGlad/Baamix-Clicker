// main.js - Core game logic and initialization

import { updateScore, updateBaamixPerSecond, updateFactories, updateQuests } from './dom.js';
import { factories, calculateTotalProduction, buyFactory } from './factories.js';
import { quests, checkQuestCompletion, loadQuests, saveQuests } from './quests.js';
import { loadGameData, saveGameData } from './storage.js';
import { setupMenu } from './menu.js';

let points = 0;
let baamixPerSecond = 0;
let gameLoopInterval; // Variable to hold the game loop interval

// Function to increment points on click
function incrementPoints() {
  points++;
  updateScore(points);
  checkQuestCompletion(points); // Check quests on each click
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
    factories.forEach((factory, index) => {
      factory.quantity = savedData.factories?.[index]?.quantity || 0;
      factory.cost = savedData.factories?.[index]?.cost || factory.cost;
    });
    loadQuests(savedData.quests || quests);
  }

  calculateBaamixPerSecond();
  updateUI();
  setupMenu();

  // Set up event listener for Baamix button click
  const baamixButton = document.getElementById('baamix-button');
  if (baamixButton) {
    baamixButton.addEventListener('click', incrementPoints);
  } else {
    console.warn('Baamix button not found. Please check the HTML structure.');
  }

  // Event delegation for factory buttons
  const factoriesContainer = document.getElementById('factories-container');
  if (factoriesContainer) {
    factoriesContainer.addEventListener('click', handleFactoryClick);
  } else {
    console.warn('Factories container not found. Please check the HTML structure.');
  }

  // Start the game loop interval
  if (!gameLoopInterval) {
    gameLoopInterval = setInterval(gameLoop, 1000);
  }
}

// Handle factory click events
function handleFactoryClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const factoryId = parseInt(event.target.dataset.factoryId, 10);
    if (isNaN(factoryId)) return; // Exit if factoryId is not a number

    const purchaseResult = buyFactory(factoryId, points);
    if (purchaseResult.success) {
      points = purchaseResult.updatedPoints;
      calculateBaamixPerSecond();
      updateFactories(factories, points);
      updateScore(points);
      saveGameData({ points, factories, quests });
    } else {
      alert(purchaseResult.message); // Provide feedback on purchase failure
    }
  }
}

// Initialize game on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initGame);

// Export points and factories if needed for debugging or testing
export { points, factories, quests };
