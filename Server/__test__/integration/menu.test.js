require("dotenv").config();
const Menu = require("../../models/menuModel");
const menuController = require("../../controllers/menuController");
const { setupTestDB } = require("../../test-setup");
const mongoose = require("mongoose");

const supertest = require("supertest");
const express = require("express");

const app = express();

app.use("/api/menu", menuController.getMenu);
app.post("/api/menu", menuController.addNewItemToMenu);
app.get("/api/menu/:id", menuController.getMenuById);
app.put("/api/menu/:id", menuController.updateMenu)
app.delete("/api/menu/:id", menuController.deleteItemFromMenu);

const request = supertest(app);

beforeAll(async () => {
  await setupTestDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Menu Controller", () => {
  jest.setTimeout(30000);
  describe("GET /api/menu", () => {
    it("should get all menu items", async () => {
      const response = await request.get("/api/menu");
      expect(response.status).toBe(200);
    },30000);
  });

  describe("GET /api/menu/:id", () => {
    it("should get a single menu item by ID", async () => {
      const menuItem = await Menu.create({
        user: "60b6b1b9b3b3f3b5b4f5b4b3",
        name: "Sashimi Salad",
        image:
          "https://www.rachelphipps.com/wp-content/uploads/2019/02/Salmon-Sashimi-Instagram.jpg",
        description:
          "Fresh organic greens topped with market-fresh sashimi and a zesty wasabi soy vinaigrette.",
        isAvailable: true,
        rating: 0,
        numReviews: 0,
        price: 15.99,
      });
      const response = await request.get(`/api/menu/${menuItem._id}`);
      expect(response.status).toBe(200);
    },30000);
  });

  describe("POST /api/menu", () => {
    it("should add a new item to the menu", async () => {
      const menuItem = await Menu.create({
        user: "60b6b1b9b3b3f3b5b4f5b4b3",
        name: "Sashimi Salad",
        image:
          "https://www.rachelphipps.com/wp-content/uploads/2019/02/Salmon-Sashimi-Instagram.jpg",
        description:
          "Fresh organic greens topped with market-fresh sashimi and a zesty wasabi soy vinaigrette.",
        isAvailable: true,
        rating: 0,
        numReviews: 0,
        price: 15.99,
      });
      const response = await request.post("/api/menu").send(menuItem);
      expect(response.status).toBe(200);
    }, 30000);
  });

  describe("PUT /api/menu/:id", () => {
    it("should update a menu item by ID", async () => {
      const menuItem = await Menu.create({
        user: "60b6b1b9b3b3f3b5b4f5b4b3",
        name: "Sashimi Salad",
        image:
          "https://www.rachelphipps.com/wp-content/uploads/2019/02/Salmon-Sashimi-Instagram.jpg",
        description:
          "Fresh organic greens topped with market-fresh sashimi and a zesty wasabi soy vinaigrette.",
        isAvailable: true,
        rating: 0,
        numReviews: 0,
        price: 15.99,
      });

      const updatedData = {
        user: "60b6b1b9b3b3f3b5b4f5b4b3",
        name: "Sashimi Salad",
        image:
          "https://www.rachelphipps.com/wp-content/uploads/2019/02/Salmon-Sashimi-Instagram.jpg",
        description:
          "Fresh organic greens topped with market-fresh sashimi and a zesty wasabi soy vinaigrette.",
        isAvailable: false,
        rating: 5,
        numReviews: 3,
        price: 20.99,
      };

      const response = await request
        .put(`/api/menu/${menuItem._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
    }, 30000);
  });

  describe("DELETE /api/menu/:id", () => {
    it("should delete a menu item by ID", async () => {
      const menuItemId = "65a9b55690a47bf5fde04dbf";

      const response = await request.delete(`/api/menu/${menuItemId}`).send({
        description: "Some description",
        user: "someUserId",
      });

      expect(response.status).toBe(200);
    },30000);
  });
});
