import express from 'express';
import { resolve, join } from 'node:path';

const app = express();
const port = 3000;
app.use(express.static(resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist/index.html'));

    res.status(200);
});

app.listen(port, () => {
    console.log(`Express сервер запущен на порту ${port}`);
});