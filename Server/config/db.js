// import mongoose from "mongoose";
const mongoose = require("mongoose");

const connectToDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}
module.exports = connectToDB;