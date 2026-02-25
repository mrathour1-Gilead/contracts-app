import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

// ESM-safe __dirname
const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000",
    //     changeOrigin: true,
    //   },
    // },
  },

  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },

  assetsInclude: ["**/*.svg", "**/*.csv"],
});