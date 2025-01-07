import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/login/",
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
