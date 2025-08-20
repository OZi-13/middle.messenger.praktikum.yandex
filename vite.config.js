import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
export default defineConfig({
    plugins: [handlebars()],
//    root: './static', // Теперь Vite будет искать index.html в папке 'static'
//    build: {
//        outDir: 'build', // Теперь проект будет собираться в папку 'build'
//    },
});