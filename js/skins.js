// skins.js - Skin management and application

const baamixButton = document.getElementById('baamix-button'); // Cache button element

export function setupSkins() {
  const skinButtons = document.querySelectorAll('.skin-options button');
  skinButtons.forEach(button => {
    button.addEventListener('click', handleSkinSelection);
  });

  loadSavedSkin(); // Load skin on setup
}

function handleSkinSelection(event) {
  const selectedSkin = event.target.dataset.skin;
  applySkin(selectedSkin);
  saveSkinPreference(selectedSkin); // Save preference on selection
}

function applySkin(skinName) {
  if (!baamixButton) {
    console.error('Baamix button element not found!'); // Error handling if button is missing
    return;
  }

  let skinPath;
  switch (skinName) {
    case 'original':
      skinPath = 'assets/images/Skins/baamixbg.png';
      break;
    case 'baatman':
      skinPath = 'assets/images/Skins/Baatman.png';
      break;
    case 'roi':
      skinPath = 'assets/images/Skins/RoiBaamix.png';
      break;
    case 'pixel':
      skinPath = 'assets/images/Skins/SkinPixelBaamix.png';
      break;
    default:
      console.warn(`Unknown skin: ${skinName}. Reverting to default.`);
      skinPath = 'assets/images/Skins/baamixbg.png'; // Default skin path
  }
  baamixButton.src = skinPath;
}

function saveSkinPreference(skinName) {
  try {
    localStorage.setItem('selectedSkin', skinName); // Use try-catch for localStorage operations
  } catch (error) {
    console.error('Failed to save skin preference to localStorage:', error);
  }
}

function loadSavedSkin() {
  try {
    const savedSkin = localStorage.getItem('selectedSkin');
    if (savedSkin) {
      applySkin(savedSkin);
    }
  } catch (error) {
    console.error('Failed to load skin preference from localStorage:', error);
  }
}

document.addEventListener('DOMContentLoaded', setupSkins);
