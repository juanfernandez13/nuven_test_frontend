import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { config } from "dotenv";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage:{
      provider:'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: "jsdom",
    clearMocks: true,
    globals: true,
    env: {
      ...config({ path: ".env.test" }).parsed,
    },
  },
  resolve: {
    alias: [
      {
        find: "@/controllers",
        replacement: path.resolve(__dirname, "controllers"),
      },
      {
        find: "@/helpers",
        replacement: path.resolve(__dirname, "helpers"),
      },
      {
        find: "@/pages",
        replacement: path.resolve(__dirname, "pages"),
      },
    ],
  },
});
