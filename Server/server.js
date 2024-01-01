import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser'
import { notFoundError, errorHandler } from './middleware/errorHandelMiddleware.js';
import { validate } from './middleware/validationMiddleware/authValidation.js';
import menuRoutes from './routes/menuRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());// allow access to req.cookies
connectDB(); 

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true, 
}

app.use(cors(corsOptions));
const port = process.env.PORT || 8000;

app.use(validate);

app.use('/api/menu', menuRoutes);
app.use('/api/users', userRoutes);


app.use(notFoundError)
app.use(errorHandler)

app.listen(port,() =>{
    console.log(`server running on port: ${port}`)
})