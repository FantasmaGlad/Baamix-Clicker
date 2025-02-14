<file>
// menu.js - Menu functionality and content loading

export function setupMenu() {
  const skinsButton = document.getElementById('skins-button');
  const rulesButton = document.getElementById('rules-button');
  const conditionsButton = document.getElementById('conditions-button');

  skinsButton.addEventListener('click', () => loadContent('skins.html'));
  rulesButton.addEventListener('click', () => loadContent('regles.html'));
  conditionsButton.addEventListener('click', () => loadContent('conditions.html'));
}

// Load dynamic content into the main area
async function loadContent(page) {
  try {
    const response = await fetch(page);
    if (!response.ok) {
      throw new Error(`Failed to load ${page}: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    const contentContainer = document.createElement('div');
    contentContainer.className = 'dynamic-content'; // Use class name for easier selection
    contentContainer.innerHTML = html;

    // Replace existing dynamic content
    const mainArea = document.getElementById('main-area'); // Target main game area
    const existingContent = mainArea.querySelector('.dynamic-content');
    if (existingContent) {
      mainArea.removeChild(existingContent);
    }
    mainArea.appendChild(contentContainer);
  } catch (error) {
    console.error('Error loading content:', error);
    // Consider displaying an error message to the user in the UI
    alert(`Failed to load content: ${error.message}`);
  }
}
</file>
