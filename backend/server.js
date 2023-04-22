import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedroutes.js';
import productRouter from './routes/productroutes.js';


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

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`starting server at http://localhost:${port}`);
});