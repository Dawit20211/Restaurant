const express = require("express");
const authValidation = require('../middleware/validationMiddleware/authValidation.js');
const {
  validateLogin,
  validateRegister,
  validate
} = authValidation;

const router = express.Router();
const userController = require('../controllers/userController.js');
const protectionMiddleware = require('../middleware/authMiddleware/protectionMiddleware.js');
const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUser
} = userController;

const {
  adminOnly,
  ensureAuthenticated
} = protectionMiddleware;

// here will be all the different user related routes
router.post("/register", validateRegister, validate, registerUser);
router.post("/login", validateLogin, validate, authUser);
router.get("/", ensureAuthenticated, adminOnly, getAllUsers);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(ensureAuthenticated, getUserProfile)
  .put(ensureAuthenticated, updateUserProfile);
router
  .route("/:id")
  .get(ensureAuthenticated, adminOnly, getUserById)
  .delete(ensureAuthenticated, adminOnly, deleteUserById)
  .put(ensureAuthenticated, adminOnly, updateUser);

module.exports = router;
