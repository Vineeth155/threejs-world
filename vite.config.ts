import { defineConfig, type UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const config: UserConfigExport = defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});

export default config;
