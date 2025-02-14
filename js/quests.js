<file>
// quests.js - Quests management and UI updates

export let quests = [
  { id: 0, description: "Click Baamix 100 times", goal: 100, progress: 0, isCompleted: false, rewardImage: "./assets/images/Skins/Baatman.png" },
  // Add more quests here
];

// Check and update quest completion status
export function checkQuestCompletion(currentPoints) {
  quests.forEach(quest => {
    if (!quest.isCompleted) {
      if (quest.id === 0 && currentPoints >= quest.goal) { // Example: Quest 0 is click quest
        quest.isCompleted = true;
        quest.progress = quest.goal; // Ensure progress is maxed out
        alert(`Quest Completed: ${quest.description}! Reward: Skin unlocked!`);
        // You could trigger reward logic here, like unlocking skins
      }
      // Add conditions for other quests here based on their IDs and game state
    }
    quest.progressPercentage = (quest.progress / quest.goal) * 100; // Update progress percentage
    if (quest.progressPercentage > 100) quest.progressPercentage = 100; // Cap at 100%
  });
  updateQuestsUI(); // Update UI after checking all quests
}


// Update the quests UI display
export function updateQuestsUI() {
  const questsContainer = document.getElementById('quests-container');
  if (!questsContainer) return; // Exit if container is not found

  const questsHTML = quests.map(quest => `
    <div class="quest ${quest.isCompleted ? 'completed' : ''}">
      <h3>${quest.description}</h3>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${quest.progressPercentage}%"></div>
      </div>
      <p>${quest.progress} / ${quest.goal}</p>
      ${quest.isCompleted ? `<img src="${quest.rewardImage}" alt="Reward" />` : ''}
    </div>
  `).join('');
  questsContainer.innerHTML = questsHTML;
}


// Load quests from saved data
export function loadQuests(savedQuests) {
  if (savedQuests && Array.isArray(savedQuests)) {
    quests = savedQuests.map(savedQuest => {
      const defaultQuest = quests.find(q => q.id === savedQuest.id); // Match by ID
      return defaultQuest ? { ...defaultQuest, ...savedQuest } : savedQuest; // Merge saved data with defaults
    });
  }
}

// Save quest state - consider if needed, game data save in main.js might be sufficient
export function saveQuests() {
  // Saving quests is now handled in saveGameData in main.js to keep all save logic centralized
}

</file>
