// import dotenv from "dotenv";
// import users from "./data/users.js";
// import colors from "colors";
// import menu from "./data/menu.js";
// import User from "./models/userModel.js";
// import Menu from "./models/menuModel.js";
// import Order from "./models/orderModel.js";
// import connectDB from "./config/db.js";

const dotenv = require("dotenv");
const users = require("./data/users.js");
const colors = require("colors");
const menu = require("./data/menu.js");
const User = require("./models/userModel.js");
const Menu = require("./models/menuModel.js");
const Order = require("./models/orderModel.js");
const connectDB = require("./config/db.js");


dotenv.config();
connectDB

const importData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Menu.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users); // returns an array of users
        const adminUser = createdUsers[0]._id; // the first user in the array is the admin user which is set in the data/users.js file

        const sampleMenu = menu.map((menu) => { // map through the menuItems array and add the admin user to each menuItem
            return {...menu, user: adminUser};
        })

        await Menu.insertMany(sampleMenu); 

        console.log('Data Imported Successfully'.green.inverse);
        process.exit();
    } catch (error) {
       console.error(`${error}`.red.inverse); 
    } 
}

const destroyData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await Menu.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed Successfully'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse); 
        process.exit(1);
    } 
}

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

