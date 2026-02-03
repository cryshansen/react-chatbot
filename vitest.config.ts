import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // ← This enables document/window for your tests
    globals: true,        // optional, allows using expect, describe, it without imports
    setupFiles: './src/setupTests.ts', // optional, for global mocks
  },
});
