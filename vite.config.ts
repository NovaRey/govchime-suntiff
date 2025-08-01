import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/govchime-suntiff/',
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.[tj]sx?$/,
    exclude: []
  },
  server: {
    proxy: {
      '/api/sam': {
        target: 'https://api.sam.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sam/, ''),
        secure: true,
        headers: {
          'User-Agent': 'GovChime/1.0 (Federal Contracting Platform)',
          'X-Api-Key': 'uWiwJAsOb46Qfwd39xkOzCJCHwMVIVr1nyrtRvc8'
        }
      },
      '/api/fpds': {
        target: 'https://www.fpds.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fpds/, ''),
        secure: true,
        headers: {
          'User-Agent': 'GovChime/1.0 (Federal Contracting Platform)',
          'Accept': 'application/atom+xml'
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
