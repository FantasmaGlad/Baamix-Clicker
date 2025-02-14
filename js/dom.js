// dom.js - Handles all DOM manipulations and UI updates

const scoreDisplay = document.getElementById('baamix-score');
const perSecondDisplay = document.getElementById('baamix-per-second');
const factoriesContainer = document.getElementById('factories-container');
const questsContainer = document.getElementById('quests-container');

// Update the score display
export function updateScore(points) {
  scoreDisplay.textContent = `${points} Baamix`;
}

// Update the Baamix per second display
export function updateBaamixPerSecond(baamixPerSecond) {
  perSecondDisplay.textContent = `par seconde : ${baamixPerSecond}`;
}

// Update the factories display
export function updateFactories(factories, points) {
    factoriesContainer.innerHTML = factories.map(factory => `
      <div class="factory ${factory.isUnlocked(points) ? '' : 'locked'}">
        <img src="${factory.image}" alt="${factory.name}" />
        <h3>${factory.name}</h3>
        <p>Coût: ${factory.cost} Baamix</p>
        <p>Production: ${factory.baseProduction} Baamix/sec</p>
        <p>Quantité: ${factory.quantity}</p>
        <button 
          ${factory.isUnlocked(points) ? '' : 'disabled'}
          data-factory-id="${factory.id}">
          Acheter
        </button>
      </div>
    `).join('');
  }

// Update the quests display
export function updateQuests(quests) {
  questsContainer.innerHTML = quests.map(quest => `
    <div class="quest ${quest.isCompleted ? 'completed' : ''}">
      <h3>${quest.description}</h3>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${quest.progressPercentage}%"></div>
      </div>
      <p>${quest.progress} / ${quest.goal}</p>
      ${quest.isCompleted ? `<img src="${quest.rewardImage}" alt="Récompense" />` : ''}
    </div>
  `).join('');
}

// Add other DOM-related functions as needed
