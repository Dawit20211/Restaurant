import MenuItem from '../models/menuItemModel';
import asyncHandler from 'express-async-handler';

const getMenuItems = asyncHandler(async(req, res) =>{
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
})

const getMneuItemsById = asyncHandler(async(req, res) =>{
    const menuItem = await MenuItem.findById(req.params.id)
    if(menuItem){
       return res.json(menuItem)
    }
    else{
        res.status(404).json({message : 'menu item not found'});
    }
})


