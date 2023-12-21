import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import menuItemRoutes from './routes/menuItemRoutes.js';
connectDB(); 

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) =>{

    res.send('its running')
})

app.use('/api/menuItems', menuItemRoutes);
app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})