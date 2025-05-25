import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@google/genai']
  },
  resolve: {
    alias: {
      '@google/genai': '@google/genai/dist/web/index.js'
    }
  }
}); 