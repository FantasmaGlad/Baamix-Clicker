<diff>
@@ -48,7 +48,7 @@
   calculateBaamixPerSecond();
   updateUI();
   setupMenu();
-
+  
   // Set up event listener for Baamix button click
   const baamixButton = document.getElementById('baamix-button');
   baamixButton.addEventListener('click', incrementPoints);
@@ -60,9 +60,9 @@
   if (!gameLoopInterval) { // Prevent multiple intervals from starting
     gameLoopInterval = setInterval(gameLoop, 1000);
   }
-}
+} 
 
 function handleFactoryClick(event) {
-  if (event.target.tagName === 'BUTTON') {
+  if (event.target.tagName === 'BUTTON') { 
     const factoryId = parseInt(event.target.dataset.factoryId, 10);
     if (isNaN(factoryId)) return; // Exit if factoryId is not a number
 
@@ -73,7 +73,7 @@
       updateFactories(factories, points); // Update factories UI only
       updateScore(points); // Update score display
       saveGameData({ points, factories, quests }); // Save immediately after purchase
-    } else {
+    } else { 
       alert(purchaseResult.message); // User feedback for purchase failure
     }
   }
</diff>
