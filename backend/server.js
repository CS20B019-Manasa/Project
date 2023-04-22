import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err.message);
    });
const app= express();
// test
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'No Product Found'});
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`starting server at http://localhost:${port}`);
});