import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    proxy: {
      // semua request yang mulai dengan /api/news akan diteruskan ke script.google.com
      "/api/news": {
        target: "https://script.google.com",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/news/, ""),
      },
    },
  },

  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
