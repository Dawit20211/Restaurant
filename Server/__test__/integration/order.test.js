require("dotenv").config();
const Order = require("../../models/orderModel");
const OrderController = require("../../controllers/orderController");
const { setupTestDB } = require("../../test-setup");
const mongoose = require("mongoose");
const User = require("../../models/userModel");
const userController = require("../../controllers/userController");
const supertest = require("supertest");
const express = require("express");
const bcrypt = require("bcryptjs");


const app = express();

app.use("/api/orders", OrderController.getAllOrders);
app.use("/api/orders/myorders", OrderController.getMyOrder);
app.post("/api/orders", OrderController.createOrders);
app.get("/api/orders/:id", OrderController.getOrderById);
app.put("/api/orders/:id/paid", OrderController.updatingOrderToPaid);
app.delete(
  "/api/orders/:id/delivered",
  OrderController.updatingOrderToDelivered
);
app.post("/api/users/login", userController.authUser);
app.post("/api/users", userController.registerUser);

const request = supertest(app);

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Order.deleteMany({});
});

describe("Order Controller", () => {
  const userId = "60b6b1b9b3b3f3b5b4f5b4b3";

  describe("POST /api/orders", () => {
    it("should create a new order", async () => {
      const orderData = {
        orderItems: [],
        paymentMethod: "somePaymentMethod",
        deliveryAddress: "someDeliveryAddress",
        deliveryPrice: 10.99,
        itemsPrice: 99.99,
        taxPrice: 5.0,
        totalPrice: 115.98,
      };

      const response = await request
        .post("/api/orders")
        .set("Authorization", `Bearer ${userId}`)
        .send(orderData);

      expect(response.status).toBe(200);
    }, 10000);
  });

  describe("GET /api/orders/myorders", () => {
    it("should get all orders for a user", async () => {
      const response = await request
        .get("/api/orders/myorders")
        .set("Authorization", `Bearer ${userId}`);

      expect(response.status).toBe(200);
    });
  });

  describe("GET /api/orders/:id", () => {
    const user2Id = "60b6b1b9b3b3f34f5b4b4";
    it("should get a single order by ID", async () => {
      const orderData = {
        orderItems: [],
        paymentMethod: "somePaymentMethod",
        deliveryAddress: "someDeliveryAddress",
        deliveryPrice: 10.99,
        itemsPrice: 99.99,
        taxPrice: 5.0,
        totalPrice: 115.98,
      };

      // Create an order
      const createOrderResponse = await request
        .post("/api/orders")
        .set("Authorization", `Bearer ${user2Id}`)
        .send(orderData);

      const createdOrderId = createOrderResponse.body._id;

      // Get the created order by ID using the user's token
      const getOrderResponse = await request
        .get(`/api/orders/${createdOrderId}`)
        .set("Authorization", `Bearer ${user2Id}`);

      expect(getOrderResponse.status).toBe(200);
    });
  });

  describe("GET /api/orders", () => {
    it("should get all orders", async () => {
      const response = await request.get("/api/orders");

      expect(response.status).toBe(200);
    });
  });

});
