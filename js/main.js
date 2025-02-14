// main.js - Main game logic

import { updateScore, updateBaamixPerSecond, updateFactories } from './dom.js';
import { factories, calculateTotalProduction, buyFactory } from './factories.js';
import { loadQuests, updateQuestsUI, checkQuestCompletion } from './quests.js';
import { loadGameData, saveGameData } from './storage.js';
import { setupMenu } from './menu.js';

let points = 0;
let baamixPerSecond = 0;

function incrementPoints() {
  points++;
  updateScore(points);
  checkQuestCompletion(0, points); // Assuming quest 0 is the clicking quest
}

function calculateBaamixPerSecond() {
  baamixPerSecond = calculateTotalProduction(factories);
  updateBaamixPerSecond(baamixPerSecond);
}

function updateUI() {
  updateScore(points);
  updateBaamixPerSecond(baamixPerSecond);
  updateFactories(factories, points);
  updateQuestsUI();
}

function gameLoop() {
  points += baamixPerSecond;
  updateUI();
}

function initGame() {
  const savedData = loadGameData();
  if (savedData) {
    points = savedData.points;
    // Restore factories and quests states
    Object.assign(factories, savedData.factories);
    loadQuests(savedData.quests);
  }

  document.getElementById('baamix-button').addEventListener('click', incrementPoints);

  // Event delegation for factory buttons
  document.getElementById('factories-container').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const factoryId = parseInt(event.target.dataset.factoryId);
      const result = buyFactory(factoryId, points);
      if (result.success) {
        points = result.updatedPoints; // Update points after purchase.
        calculateBaamixPerSecond(); // Recalculate Baamix per second after purchase
        updateUI(); // Update the entire UI to reflect changes.
      } else {
        alert(result.message);
      }
    }
  });

  setupMenu();
  updateUI();
  calculateBaamixPerSecond();
  setInterval(gameLoop, 1000);
  setInterval(() => {
    saveGameData({ points, factories });
  }, 10000); // Save every 10 seconds
}

document.addEventListener('DOMContentLoaded', initGame);
