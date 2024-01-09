import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler';

// description : creating a new order 
// route : POST /api/orders
// access : Private
const createOrders = asyncHandler(async(req, res) =>{
  res.send('create order')
})


// description : gets the users orders
// route : GET /api/orders/myorders
// access : Private
const getMyOrder = asyncHandler(async(req, res)=>{
    res.send('my orders')
})

// description : gets an order by id
// route : GET /api/orders/:id
// access : Private
const getOrderById = asyncHandler(async(req, res)=>{
    res.send('orders by id')
})

// description : updating order to be delivered
// route : GET /api/orders/:id/delivered
// access : Private - only for Admins
const updatingOrderToDelivered = asyncHandler(async(req, res)=>{
    res.send('delivered')
})

// description : updating order to paid 
// route : GET /api/orders/:id/paid
// access : Private - only for Admins
const updatingOrderToPaid = asyncHandler(async(req, res)=>{
    res.send('paid')
})

// description : Getting all orders
// route : GET /api/orders
// access : Private - only for Admins
const getAllOrders = asyncHandler(async(req, res)=>{
    res.send('all orders')
})


export {createOrders, 
    getAllOrders, 
    updatingOrderToDelivered, 
    updatingOrderToPaid, 
    getMyOrder,getOrderById}

