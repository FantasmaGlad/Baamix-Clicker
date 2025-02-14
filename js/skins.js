// skins.js - Handles skin selection and application

export function setupSkins() {
    const skinButtons = document.querySelectorAll('.skin-options button');
    skinButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        const selectedSkin = event.target.dataset.skin;
        applySkin(selectedSkin);
        // Optionally, save the selected skin to localStorage
        localStorage.setItem('selectedSkin', selectedSkin);
      });
    });
  
    // Load and apply the saved skin on page load
    const savedSkin = localStorage.getItem('selectedSkin');
    if (savedSkin) {
      applySkin(savedSkin);
    }
  }
  
  function applySkin(skinName) {
    const baamixButton = document.getElementById('baamix-button');
    switch (skinName) {
      case 'original':
        baamixButton.src = 'assets/images/Skins/baamixbg.png';
        break;
      case 'baatman':
        baamixButton.src = 'assets/images/Skins/Baatman.png';
        break;
      case 'roi':
        baamixButton.src = 'assets/images/Skins/RoiBaamix.png';
        break;
      case 'pixel':
        baamixButton.src = 'assets/images/Skins/SkinPixelBaamix.png';
        break;
      default:
        console.warn(`Unknown skin: ${skinName}`);
    }
  }
  
  // Ensure this runs after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', setupSkins);
