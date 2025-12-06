import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Define the name of your GitHub repository. This is crucial for asset paths.
const REPO_NAME = "fook-app";

export default defineConfig({
  // 💡 CRITICAL FIX: Set the base path to your repository name.
  base: `/${REPO_NAME}/`,

  plugins: [
    react(),
    // Keep other necessary plugins, but remove the Replit-specific conditional ones
    // for a standard build/deployment.
    // If you need the Replit plugins for local development, they can remain.
  ],
  
  // Your existing configuration for paths, which looks correct for your project structure
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  
  root: path.resolve(import.meta.dirname, "client"),
  
  build: {
    // 💡 IMPORTANT: This outDir is where the final 'index.html' and assets will be.
    // Ensure your GitHub Pages setting points to this directory's contents (e.g., set to '/dist/public').
    outDir: path.resolve(import.meta.dirname, "dist/public"), 
    emptyOutDir: true,
  },
  
  // Other server options
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
