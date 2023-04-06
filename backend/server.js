import express from 'express';
import data from './data.js';

const app= express();
// test
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`starting server at http://localhost:${port}`);
});