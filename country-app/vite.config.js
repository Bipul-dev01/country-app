import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/country-app/', 
  server: {
    port: 3001,
  },
});

