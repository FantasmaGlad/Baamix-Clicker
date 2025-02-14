// menu.js - Handles menu interactions

export function setupMenu() {
    const skinsButton = document.getElementById('skins-button');
    const rulesButton = document.getElementById('rules-button');
    const conditionsButton = document.getElementById('conditions-button');
  
    skinsButton.addEventListener('click', () => {
      // For now, we'll just log. Later, we'll load and display the skins UI.
      console.log('Open Skins Menu');
      loadContent('skins.html');
    });
  
    rulesButton.addEventListener('click', () => {
      console.log('Open Rules Menu');
      loadContent('regles.html');
    });
  
    conditionsButton.addEventListener('click', () => {
      console.log('Open Conditions Menu');
      loadContent('conditions.html');
    });
  }
  
  function loadContent(page) {
    fetch(page)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load ${page}: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Create a container for the fetched content
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('dynamic-content');
        contentContainer.innerHTML = html;
  
        // Remove any existing dynamic content
        const existingContent = document.querySelector('.dynamic-content');
        if (existingContent) {
          existingContent.remove();
        }
  
        // Add the new content to the main area
        document.querySelector('.container').appendChild(contentContainer);
      })
      .catch(error => {
        console.error('Error loading content:', error);
      });
  }
