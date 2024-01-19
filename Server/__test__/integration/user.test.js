require("dotenv").config();
const User = require("../../models/userModel");
const userController = require("../../controllers/userController");
const { setupTestDB } = require("../../test-setup");
const mongoose = require("mongoose");
const createToken = require("../../utils/createToken");
const cookieParser = require("cookie-parser");

const accessToken = process.env.JWT_SECRET;

if (!accessToken) {
  console.error("Access token not found in environment variables.");
  process.exit(1);
}

const {
  validate,
  validateRegister,
  validateLogin,
} = require("../../middleware/validationMiddleware/authValidation");
const supertest = require("supertest");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/api/users/register",
  validateRegister,
  validate,
  userController.registerUser
);
app.post("/api/users/login", validateLogin, validate, userController.authUser);
app.get("/api/users/profile", userController.getUserProfile);
app.get("/api/users/:id", userController.getUserById);
app.delete("/api/users/:id", userController.deleteUserById);
app.put("/api/users/:id", userController.updateUser);
app.post("/api/users/logout", userController.logoutUser);
app.get("/api/users", userController.getAllUsers);
app.post("/api/users/logout", userController.logoutUser);

const request = supertest(app);

beforeAll(async () => {
  await setupTestDB();

  const existingUser = await User.findOne({ email: "testuser@gmail.com" });

  if (!existingUser) {
    const validUserData = {
      name: "Test User",
      email: "testuser@gmail.com",
      phoneNumber: "1234567890",
      password: "TestPassword1!",
      isAdmin: true,
    };

    const user = await User.create(validUserData);
    //console.log("Created user:", user);
  }
}, 10000);

afterAll(async () => {
  await mongoose.connection.close();
});


beforeEach(async () => {
    await User.deleteMany({});

  const user = await User.create({
    name: "Test User",
    email: "testuser@gmail.com",
    phoneNumber: "1234567890",
    password: "TestPassword1!",
  });
});

describe("User Controller", () => {
    jest.setTimeout(10000);
  describe("User Controller - Get user by ID", () => {
    it("should get a user by ID successfully", async () => {
      const validUserData = {
        name: "User",
        email: "user@gmail.com",
        phoneNumber: "1234567890",
        password: "TestPassword1!",
      };
      const createdUser = await User.create(validUserData);
      //console.log("Created user:", createdUser);
      const userId = createdUser._id; 
      console.log("User ID:", userId);
      const response = await supertest(app).get(`/api/users/${userId}`);
      expect(response.status).toBe(200);
    }, 10000);
  });

  describe("User Controller - Logout", () => {
    it("return a 200 status if after logging out we get a message that says Logged out", async () => {
      const response = await request.post("/api/users/logout");
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Logged out!" });
    });
    describe("User Controller - Logout", () => {
        it("should clear the access token cookie and return a 200 status", async () => {
          const response = await request.post("/api/users/logout");
      
          expect(response.status).toBe(200);
          expect(response.body).toEqual({ message: "Logged out!" });
      
          const cookies = response.headers["set-cookie"];
          const accessTokenCookie = cookies.find((cookie) => cookie.startsWith("access_token"));
      
          expect(accessTokenCookie).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
        });
      });

  });

  describe("User Controller - Delete user by ID", () => {
    it("should delete a user by ID successfully", async () => {
      const validUserData = {
        name: "Test User",
        email: "user@gmail.com",
        phoneNumber: "1234567890",
        password: "TestPassword1!",
      };
      const createdUser = await User.create(validUserData);

      const userId = createdUser._id; 
      const response = await supertest(app).delete(`/api/users/${userId}`);
      expect(response.status).toBe(200);
    });
  });

  describe("User Controller - Get all users", () => {
    describe("User Controller - Get all users", () => {
        it("should get all users successfully", async () => {
          const response = await supertest(app).get('/api/users');

         // console.log("Response body:", response.body);
          expect(response.status).toBe(200);
          expect(response.body.length).toBeGreaterThanOrEqual(1); 
        });
      }, 30000);
  });   




  describe("POST /api/users/register", () => {
    it("should register a user with valid data", async () => {
      const validUserData = {
        name: "Test User",
        email: "user@gmail.com",
        phoneNumber: "1234567890",
        password: "TestPassword1!",
      };

     // console.log("Sending request with data:", validUserData);

      const response = await request
        .post("/api/users/register")
        .send(validUserData);

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("email", validUserData.email);
    }, 10000);

    it("should not register a user with invalid data", async () => {
      const invalidUserData = {
        name: "",
        email: "invalid",
        phoneNumber: "invalid",
        password: "ghjg",
      };

      const response = await request
        .post("/api/users/register")
        .send(invalidUserData);

      expect(response.status).toBe(400);
    }, 10000);
  });

  it("should return 400 Bad Request for empty registration data", async () => {
    const response = await request
      .post("/api/users/register")
      .send({ name: "", email: "", phoneNumber: "", password: "" });

    expect(response.status).toBe(400);
  });

  it("should not register a user with missing fields", async () => {
    const invalidUserData = {
      name: "Test User",
      email: "testuser@gmail.com",
      // phoneNumber is missing
      password: "TestPassword1!",
    };

    const response = await request
      .post("/api/users/register")
      .send(invalidUserData);

    expect(response.status).toBe(400);
  }, 10000);

  it("should not register a user with an invalid email format", async () => {
    const invalidUserData = {
      name: "Test User",
      email: "invalidemail",
      phoneNumber: "1234567890",
      password: "TestPassword1!",
    };

    const response = await request
      .post("/api/users/register")
      .send(invalidUserData);

    expect(response.status).toBe(400);
  }, 10000);

  it("should not register a user with an invalid phone number format", async () => {
    const invalidUserData = {
      name: "Test User",
      email: "invalidemail",
      phoneNumber: "dsfsfdfdf",
      password: "TestPassword1!",
    };

    const response = await request
      .post("/api/users/register")
      .send(invalidUserData);

    expect(response.status).toBe(400);
  });

  describe("POST /api/users/login", () => {
    it("should return 400 Bad Request for empty login data", async () => {
      const response = await request
        .post("/api/users/login")
        .send({ email: "", password: "" });

      expect(response.status).toBe(400);
    }, 10000);

    it("should not log in a user with an invalid password", async () => {
      const invalidCredentials = {
        email: "testuser@gmail.com",
        password: "",
      };

      const response = await request
        .post("/api/users/login")
        .send(invalidCredentials);

      expect(response.status).toBe(400);
    }, 10000);
  });
});
