import Menu from '../models/menuModel.js';
import asyncHandler from 'express-async-handler';

const getMenu = asyncHandler(async(req, res) =>{
  try {
    const menu = await Menu.find({});
    res.json(menu);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
}
})

const getMenuById = asyncHandler(async(req, res) =>{
    const menu = await Menu.findById(req.params.id)
    if(menu){
       return res.json(menu)
    }
    else{
      res.status(404);
      throw new Error('Item not found');
    }
})

export {getMenu,getMenuById}

