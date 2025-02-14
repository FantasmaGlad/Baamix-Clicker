// quests.js - Manages quest-related logic

export let quests = [
    { id: 0, description: "Click Baamix 100 times", goal: 100, progress: 0, isCompleted: false, rewardImage: "./assets/images/Skins/Baatman.png" },
    // Add more quests here
  ];

  export function checkQuestCompletion(questId, currentPoints) {
    const quest = quests[questId];
    if (!quest.isCompleted && currentPoints >= quest.goal) {
      quest.isCompleted = true;
      // Optionally, trigger a reward function here
      alert(`Quest completed: ${quest.description}`);
    }
  }

  export function updateQuestsUI() {
    const questsContainer = document.getElementById('quests-container');
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


  export function loadQuests(savedQuests) {
    if (savedQuests) {
      quests = savedQuests;
    }
  }
