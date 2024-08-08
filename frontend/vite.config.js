import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({ 
 
  plugins: [eslint(), reactRefresh()],
 
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
});
