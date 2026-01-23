import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true, // 👈 IMPORTANT for GSAP refs
      },
    }),
  ],
  base: "/rafail-portfolio/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
