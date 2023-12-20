import dotenv from "dotenv";
import users from "./data/users.js";
import colors from "colors";
import menuItems from "./data/menuItems.js";
import User from "./models/userModel.js";
import MenuItem from "./models/menuItem.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB

const importData = async () => {
    try {
        await connectDB();
        await Order.deleteMany();
        await MenuItem.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users); // returns an array of users
        const adminUser = createdUsers[0]._id; // the first user in the array is the admin user which is set in the data/users.js file

        const sampleMenuItems = menuItems.map((menuItem) => { // map through the menuItems array and add the admin user to each menuItem
            return {...menuItem, user: adminUser};
        })

        await MenuItem.insertMany(sampleMenuItems); 

        console.log('Data Imported Successfully'.green.inverse);
        process.exit();
    } catch (error) {
       console.error(`${error}`.red.inverse); 
    } 
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await MenuItem.deleteMany();
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

