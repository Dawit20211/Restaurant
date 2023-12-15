import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
connectDB(); // connect to database

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) =>{

    res.send('its running')
})

app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})
