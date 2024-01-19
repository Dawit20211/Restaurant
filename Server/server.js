// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import cookieParser from 'cookie-parser';
// import { notFoundError, errorHandler } from './middleware/errorHandelMiddleware.js';
// import { validate } from './middleware/validationMiddleware/authValidation.js';
// import orderRoutes from './routes/orderRoutes.js';
// import menuRoutes from './routes/menuRoutes.js';
// import userRoutes from './routes/userRoutes.js';

const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const { Server } = socketIo;
const cors = require("cors");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const {
  notFoundError,
  errorHandler,
} = require("./middleware/errorHandelMiddleware.js");
const {
  validate,
} = require("./middleware/validationMiddleware/authValidation.js");

const orderRoutes = require("./routes/orderRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const app = express();
module.exports = app;
const server = http.createServer(app);

connectDB(); // connect to database

//setting up corse config to allow access to the server
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: "*", // allow access from all origins for development purposes only
    Credentials: true,
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 8000;

//middlewares for parsing json and urlencoded data
app.use(express.json());
app.use(cookieParser()); // allow access to req.cookies
app.use(express.urlencoded({ extended: true }));

let adminSockets = []; // to store admins

io.on("connection", (socket) => {
  socket.request.user = null;

  //get user data if available
  if (socket.handshake.query.user) {
    try {
      socket.request.user = JSON.parse(socket.handshake.query.user);
    } catch (error) {
      console.error(`Error parsing user data: ${error}`);
    }
  }
  console.log(`User connected: ${socket.id}`);

  // Check if the connected user is an admin
  const isAdmin = socket.request.user && socket.request.user.isAdmin;

  if (isAdmin) {
    console.log(`Admin connected: ${socket.id}`);
    adminSockets.push(socket);
  }

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    adminSockets = adminSockets.filter(
      (adminSocket) => adminSocket.id !== socket.id
    );
  });

  // Listen for paymentSuccess event
  socket.on("paymentSuccess", (data) => {
    try {
      console.log(
        `Payment successful for order ${data.orderId} by user ${data.userId}`
      );
      adminSockets.forEach((adminSocket) => {
        // sending the admin notification
        adminSocket.emit(
          "adminNotification",
          `Order ${data.orderId} has been placed by user ${data.userId}`
        );
      });
    } catch (error) {
      console.error(`Error handling paymentSuccess event: ${error}`);
    }
  });
});

app.use(validate);

app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundError);
app.use(errorHandler);

server.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
