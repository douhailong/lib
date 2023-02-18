import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: '@', replacement: resolve(__dirname, 'src') },
            { find: '@lib', replacement: resolve(__dirname, 'src/lib') },
            { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
            { find: '@config', replacement: resolve(__dirname, 'src/config') },
            { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') }
        ]
    }
});
