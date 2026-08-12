import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["android/launchericon-512x512.png"],
      manifest: {
        name: "FocusDeck",
        short_name: "FocusDeck",
        start_url: "/",
        description: "Next-gen React PWA of FocusDeck",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "android/launchericon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android/launchericon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // Cache all build assets
      },
    }),
  ],
});
