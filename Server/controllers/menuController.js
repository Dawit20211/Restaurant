// import Menu from "../models/menuModel.js";
// import asyncHandler from "express-async-handler";

const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

// description : get all the menu items
// route :  GET /api/menu
const getMenu = asyncHandler(async (req, res) => {
  try {
    const menu = await Menu.find({});
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// description : Get a single item from the menu
// route : GET /api/menu/:id
const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (menu) {
    return res.json(menu);
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

// description : Add a new menu item into the menu list
// route : POST /api/menu
// access : Private - only admins can add
const addNewItemToMenu = asyncHandler(async (req, res) => {
  const menu = new Menu({
    name: "name placeholder",
    image: "/assets/images/plate.jpg",
    user: req.user._id,
    description: "placeholder",
    isAvailable: true,
    rating: 0,
    numReviews: 0,
    price: 0,
  });
  const createMenuItem = await menu.save();
  res.status(200).json(createMenuItem);
});

// description : update a menu
// route : PUT /api/menu/:id
// access : Private - only admins can add
const updateMenu = asyncHandler(async (req, res) => {
  try {
    const data = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(data)
    }
  catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

// description : delete ana item from the menu
// route :  DELETE /api/menu/:id
// admin only - private 
const deleteItemFromMenu = asyncHandler(async (req, res) => {
  try {
    const data = await Menu.findOneAndDelete({ _id: req.params.id });
    res.status(200).json(data)
  }
  catch (error) {
    res.status(500)
    throw new Error ( 'not found')
  }
});

// export { getMenu, getMenuById, addNewItemToMenu, updateMenu, deleteItemFromMenu };
module.exports = {
  getMenu,
  getMenuById,
  addNewItemToMenu,
  updateMenu,
  deleteItemFromMenu
};