const express = require("express");

const router = express.Router();
const menuController = require('../controllers/menuController.js');
const protectionMiddleware = require('../middleware/authMiddleware/protectionMiddleware.js');

const {
  getMenu,
  getMenuById,
  updateMenu,
  deleteItemFromMenu,
  addNewItemToMenu
} = menuController;

const {
  ensureAuthenticated,
  adminOnly
} = protectionMiddleware;


router
  .route("/")
  .get(getMenu)
  .post(ensureAuthenticated, adminOnly, addNewItemToMenu);

router
  .route("/:id")
  .get(getMenuById)
  .put(ensureAuthenticated, adminOnly, updateMenu)
  .delete(ensureAuthenticated, adminOnly, deleteItemFromMenu); 

  module.exports = router;
