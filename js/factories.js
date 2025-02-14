// factories.js - Factory logic and calculations

export const factories = [
  {
    id: 1,
    name: "Ferme Baamix",
    cost: 100,
    baseProduction: 1,
    quantity: 0,
    image: "./assets/images/FermeBaamix.png",
    imageOmbree: "./assets/images/FermeBaamixOmbre.png",
    isUnlocked: () => true // First factory always unlocked - optimized as arrow function
  },
  {
    id: 2,
    name: "Usine Baamix",
    cost: 500,
    baseProduction: 5,
    quantity: 0,
    image: "./assets/images/UsineBaamix.png",
    imageOmbree: "./assets/images/UsineBaamixOmbre.png",
    isUnlocked: (points) => factories[0].quantity > 0 // Optimized unlock condition
  },
  {
    id: 3,
    name: "Fusée Baamix",
    cost: 2000,
    baseProduction: 20,
    quantity: 0,
    image: "./assets/images/FuseeBaamix.png",
    imageOmbree: "./assets/images/FuseeBaamixOmbre.png",
    isUnlocked: (points) => factories[1].quantity > 0 // Optimized unlock condition
  },
  {
    id: 4,
    name: "Atome Baamix",
    cost: 10000,
    baseProduction: 100,
    quantity: 0,
    image: "./assets/images/AtomeBaamix.png",
    imageOmbree: "./assets/images/AtomeBaamixOmbre.png",
    isUnlocked: (points) => factories[2].quantity > 0 // Optimized unlock condition
  },
  {
    id: 5,
    name: "Trou Noir Baamix",
    cost: 50000,
    baseProduction: 500,
    quantity: 0,
    image: "./assets/images/BaamixTrouNoir.png",
    imageOmbree: "./assets/images/BaamixTrouNoirOmbre.png",
    isUnlocked: (points) => factories[3].quantity > 0  // Optimized unlock condition
  },
];

// Efficiently calculate total production using reduce
export function calculateTotalProduction(factoriesList) {
  return factoriesList.reduce((total, factory) => total + factory.baseProduction * factory.quantity, 0);
}

// Optimized factory purchase logic
export function buyFactory(factoryId, currentPoints) {
  const factory = factories.find(f => f.id === factoryId);
  if (!factory) {
    console.warn(`Factory with id ${factoryId} not found.`); // More informative logging
    return { success: false, message: "Factory not found!" };
  }

  if (!factory.isUnlocked(currentPoints)) {
      return { success: false, message: "Factory is locked!" };
  }

  if (currentPoints < factory.cost) {
    return { success: false, message: "Not enough Baamix!" };
  }

  const actualCost = factory.cost;
  factory.quantity++;
  factory.cost = Math.floor(factory.cost * 1.10); // Cost increases by 10%
  return { success: true, updatedPoints: currentPoints - actualCost, updatedFactory: factory };
}
