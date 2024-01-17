// import { get } from "mongoose";
// import Order from "../models/orderModel.js";
// import asyncHandler from "express-async-handler";
// import stripe from "stripe";

const Order = require("../models/orderModel.js");
const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// route : POST /api/orders
// access : Private
const createOrders = asyncHandler(async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    deliveryAddress,
    deliveryPrice,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No orders");
  } else {
    const order = new Order({
      orderItems: orderItems.map((a) => ({
        ...a,
        menu: a._id,
        _id: undefined,
      })),
      user: req.user._id,
      deliveryAddress,
      itemsPrice,
      paymentMethod,
      deliveryPrice,
      taxPrice,
      totalPrice,
    });

    const createTheOrder = await order.save();

    res.status(200).json(createTheOrder);
  }
});

// route : GET /api/orders/myorders
// access : Private
const getMyOrder = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({ user: req.user._id });

  if (myOrders && myOrders.length > 0) {
    res.status(200).json(myOrders);
  } else {
    res.status(404);
    throw new Error("No orders were found");
  }
});

// route : GET /api/orders/:id
// access : Private
const getOrderById = asyncHandler(async (req, res) => {
  const orderById = await Order.findById(req.params.id).populate(
    "user",
    "name email phonNumber"
  );

  if (orderById) {
    res.status(200).json(orderById);
  } else {
    res.status(404);
    throw new Error("order does not exist");
  }
});

//updating order to be delivered
// route : GET /api/orders/:id/delivered
// access : Private - only for Admins
const updatingOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.isDeliveredAt = Date.now();
    const update = await order.save();
    res.status(200).json(update);
  } else {
    res.status(404);
    throw new Error("no order was found");
  }
});

//updating order to paid
// route : PUT /api/orders/:id/paid
// access : Private
const updatingOrderToPaid = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  //console.log(req.body);

  const order = await Order.findById(orderId);
  const amountInCents = Math.round(order.totalPrice * 100);

  if (!order) {
    res.status(404).json("Order not found");
    return;
  }
  try {
    const { stripeToken } = req.body; 
   // console.log("stripeToken", stripeToken);

    // Create a charge with Stripe
    const charge = await stripe.charges.create({
    amount: amountInCents,
    currency: "GBP",
    source: stripeToken, 
    description: 'Order payment',
    });

    if (charge.status === "succeeded") {
      // Update the order with payment details
      order.paymentResult = {
        id: charge.id,
        status: charge.status,
        updateTime: new Date(charge.created * 1000),
        emailAddress: charge.receipt_email,
      };

      // Update order status to paid
      order.isPaid = true;
      order.paidAt = new Date();
      await order.save();
      res.status(200).json({ message: "Payment successful", orderId: order._id });

    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// route : GET /api/orders
// access : Private - only for Admins
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user").exec();
  res.status(200).json(orders);
});

module.exports = {
  createOrders,
  getAllOrders,
  updatingOrderToDelivered,
  updatingOrderToPaid,
  getMyOrder,
  getOrderById,
};


