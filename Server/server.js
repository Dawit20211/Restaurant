import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import bodyParser from 'body-parser'
import menuItemRoutes from './routes/menuItemRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(bodyParser.json());
connectDB(); 

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true, 
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get('/', (req, res) =>{

    res.send('its running')
})

app.use('/api/menu', menuItemRoutes);
app.use('/api/users', userRoutes);

app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})