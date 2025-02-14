import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Project root is the current directory
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clean the output directory before building
    sourcemap: true,
  },
  server: {
    open: true, // Open the browser on server start
    port: 3000,
  },
});
