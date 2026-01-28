import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [],
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
        },
    },
    css: {
        postcss: './postcss.config.js',
    },
});
