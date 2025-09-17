import express from 'express';
import path, { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
app.use(express.static(resolve(__dirname, 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));

    res.status(200);
});

app.listen(port, () => {
    console.log(`Express сервер запущен на порту ${port}`);
});
