import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedroutes.js';
import productRouter from './routes/productroutes.js';
import userRouter from './routes/userroutes.js';
import orderRouter from './routes/orderroutes.js';


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`starting server at http://localhost:${port}`);
});