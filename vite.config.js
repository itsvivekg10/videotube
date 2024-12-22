import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Ensure that the React plugin is correctly initialized
  ],
  server: {
    open: true, // Automatically opens the app in the browser
    port: 3000, // You can change the port if needed
    strictPort: true, // Fail if the port is already in use
  },
  resolve: {
    alias: {
      "@": "/src", // Add path alias if necessary
    },
  },
});
