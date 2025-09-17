import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: 'src',
    plugins: [handlebars()],
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
        },
    },
    css: {
        postcss: '../postcss.config.js',
    },
});
