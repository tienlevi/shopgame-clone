import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envCompatible()],
  envPrefix: "BASE_SERVER",
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
      ".json",
      ".png",
      ".jpg",
      ".jpeg",
      ".gif",
      ".svg",
    ],
  },
});
