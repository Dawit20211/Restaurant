import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFoundError, errorHandler } from './middleware/errorHandelMiddleware.js';
import { validate } from './middleware/validationMiddleware/authValidation.js';
import orderRoutes from './routes/orderRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
connectDB(); 
const port = process.env.PORT || 8000;

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,  
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());// allow access to req.cookies
app.use(express.urlencoded({ extended: true }));


// app.get('/', (req, res) => {
//     res.send('its working');
// });

app.use(validate);

app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);

// app.get('/api/stripe', (req, res) => {
//     res.send({ secretKey: process.env.STRIPE_SECRET_KEY });
// });

app.use(notFoundError)
app.use(errorHandler)

app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})