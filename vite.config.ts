import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify-file watching is disabled to prevent flickering during agent edits.
      watch: {
        usePolling: process.env.CHOKIDAR_USEPOLLING === 'true',
        interval: Number(process.env.CHOKIDAR_INTERVAL ?? 100),
      },
      hmr:
        process.env.DISABLE_HMR !== 'true'
          ? {
              host: process.env.VITE_HMR_HOST,
              clientPort: process.env.VITE_HMR_CLIENT_PORT
                ? Number(process.env.VITE_HMR_CLIENT_PORT)
                : undefined,
            }
          : false,
    },
  };
});
