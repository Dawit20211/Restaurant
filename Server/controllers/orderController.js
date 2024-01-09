import { get } from 'mongoose';
import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler';

// description : creating a new order 
// route : POST /api/orders
// access : Private
const createOrders = asyncHandler(async(req, res) =>{
    const{
        orderItems,
        paymentMethod,
        deliveryAddress,
        deliveryPrice,
        itemsPrice,
        taxPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0){
      res.status(400);
      throw new Error('No orders');
    }else{
        const order = new Order({
            orderItems: orderItems.map((a) => ({ ...a, menu: a._id, _id: undefined})),
            user: req.user._id,
            deliveryAddress,
            itemsPrice,
            paymentMethod,
            deliveryPrice,
            taxPrice,
            totalPrice,  
        })

        const createTheOrder = await order.save();

        res.status(200).json(createTheOrder)

    }

})


// description : gets the users orders
// route : GET /api/orders/myorders
// access : Private
const getMyOrder = asyncHandler(async(req, res) => {
    const myOrders = await Order.find({ user: req.user._id });

    if (myOrders && myOrders.length > 0) {
        res.status(200).json(myOrders);
    } else {
        res.status(404);
        throw new Error('No orders were found');
    }
});

// description : gets an order by id
// route : GET /api/orders/:id
// access : Private
const getOrderById = asyncHandler(async(req, res)=>{
     const orderById = await Order.findById(req.params.id).populate('user', 'name email phonNumber')

     if(orderById){
        res.status(200).json(orderById)
     }else{
        res.status(404);
        throw new Error ('order does not exist')
    }
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

