// factories.js - Manages factory-related logic

import { formatNumber } from './utils.js';

export const factories = [
  {
    id: 1,
    name: "Ferme Baamix",
    cost: 100,
    baseProduction: 1,
    quantity: 0,
    image: "./assets/images/FermeBaamix.png",
    imageOmbree: "./assets/images/FermeBaamixOmbre.png",
    isUnlocked(points) { // Now a method of the factory object
      return true; // The first factory is always unlocked
    }
  },
  {
    id: 2,
    name: "Usine Baamix",
    cost: 500,
    baseProduction: 5,
    quantity: 0,
    image: "./assets/images/UsineBaamix.png",
    imageOmbree: "./assets/images/UsineBaamixOmbre.png",
    isUnlocked(points) {
      const prevFactory = factories[this.id - 2]; // Correctly access the previous factory
      return prevFactory && prevFactory.quantity > 0;
    }
  },
  {
    id: 3,
    name: "Fusée Baamix",
    cost: 2000,
    baseProduction: 20,
    quantity: 0,
    image: "./assets/images/FuseeBaamix.png",
    imageOmbree: "./assets/images/FuseeBaamixOmbre.png",
    isUnlocked(points) {
      const prevFactory = factories[this.id - 2];
      return prevFactory && prevFactory.quantity > 0;
    }
  },
  {
    id: 4,
    name: "Atome Baamix",
    cost: 10000,
    baseProduction: 100,
    quantity: 0,
    image: "./assets/images/AtomeBaamix.png",
    imageOmbree: "./assets/images/AtomeBaamixOmbre.png",
    isUnlocked(points) {
      const prevFactory = factories[this.id - 2];
      return prevFactory && prevFactory.quantity > 0;
    }
  },
  {
    id: 5,
    name: "Trou Noir Baamix",
    cost: 50000,
    baseProduction: 500,
    quantity: 0,
    image: "./assets/images/BaamixTrouNoir.png",
    imageOmbree: "./assets/images/BaamixTrouNoirOmbre.png",
    isUnlocked(points) {
      const prevFactory = factories[this.id - 2];
      return prevFactory && prevFactory.quantity > 0;
    }
  },
];

export function calculateTotalProduction(factories) {
  return factories.reduce((total, factory) => {
    return total + factory.baseProduction * factory.quantity;
  }, 0);
}

export function buyFactory(factoryId, points) {
  const factory = factories.find(f => f.id === factoryId);
  if (factory && points >= factory.cost) {
    const actualCost = factory.cost; // Store the cost before updating
    factory.quantity++;
    factory.cost = Math.floor(factory.cost * 1.10); // Increase cost by 10%
    return { success: true, updatedPoints: points - actualCost, updatedFactory: factory }; // Subtract actual cost
  }
  return { success: false, message: "Not enough Baamix!" };
}
