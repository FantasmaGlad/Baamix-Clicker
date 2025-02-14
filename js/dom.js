<diff>
@@ -49,7 +49,7 @@
 
 // Update the factories display
 export function updateFactories(factories, points) {
-    factoriesContainer.innerHTML = factories.map(factory => `
+  factoriesContainer.innerHTML = factories.map(factory => `
       <div class="factory ${factory.isUnlocked(points) ? '' : 'locked'}">
         <img src="${factory.image}" alt="${factory.name}" />
         <h3>${factory.name}</h3>
@@ -63,7 +63,7 @@
         </button>
       </div>
     `).join('');
-  }
+}
 
 // Update the quests display
 export function updateQuests(quests) {
</diff>
