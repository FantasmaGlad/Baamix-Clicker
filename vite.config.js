<file>
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './', // Project root is the current directory
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clean the output directory before building
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Ensure main entry point is index.html
      },
    },
  },
  server: {
    open: true, // Open the browser on server start
    port: 3000,
  },
});
</file>
