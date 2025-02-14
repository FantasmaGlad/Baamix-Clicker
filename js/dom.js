<file>
// dom.js - DOM manipulation and UI updates

const scoreDisplay = document.getElementById('baamix-score');
const perSecondDisplay = document.getElementById('baamix-per-second');
const factoriesContainer = document.getElementById('factories-container');
const questsContainer = document.getElementById('quests-container');

// Efficiently update score display
export function updateScore(points) {
  scoreDisplay.textContent = `${points} Baamix`;
}

// Efficiently update Baamix per second display
export function updateBaamixPerSecond(baamixPerSecond) {
  perSecondDisplay.textContent = `par seconde : ${baamixPerSecond}`;
}

// Optimize factories display update for performance
export function updateFactories(factories, points) {
  if (!factoriesContainer) return; // Prevent errors if container not found

  const factoryHTML = factories.map(factory => {
    const isUnlocked = factory.isUnlocked(points);
    return `
      <div class="factory ${isUnlocked ? '' : 'locked'}">
        <img src="${factory.image}" alt="${factory.name}" />
        <h3>${factory.name}</h3>
        <p>Coût: ${factory.cost} Baamix</p>
        <p>Production: ${factory.baseProduction} Baamix/sec</p>
        <p>Quantité: ${factory.quantity}</p>
        <button
          ${isUnlocked ? '' : 'disabled'}
          data-factory-id="${factory.id}">
          Acheter
        </button>
      </div>
    `;
  }).join('');
  factoriesContainer.innerHTML = factoryHTML;
}


// Efficiently update quests display
export function updateQuests(quests) {
  if (!questsContainer) return; // Prevent errors if container not found

  const questsHTML = quests.map(quest => {
    return `
      <div class="quest ${quest.isCompleted ? 'completed' : ''}">
        <h3>${quest.description}</h3>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${quest.progressPercentage}%"></div>
        </div>
        <p>${quest.progress} / ${quest.goal}</p>
        ${quest.isCompleted ? `<img src="${quest.rewardImage}" alt="Récompense" />` : ''}
      </div>
    `;
  }).join('');
  questsContainer.innerHTML = questsHTML;
}
</file>
