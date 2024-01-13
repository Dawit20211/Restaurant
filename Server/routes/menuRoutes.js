import express from "express";
const router = express.Router();
import {
  getMenu,
  getMenuById,
  updateMenu,
  addNewItemToMenu,
} from "../controllers/menuController.js";

import {
  ensureAuthenticated,
  adminOnly,
} from "../middleware/authMiddleware/protectionMiddleware.js";

router
  .route("/")
  .get(getMenu)
  .post(ensureAuthenticated, adminOnly, addNewItemToMenu);

router
  .route("/:id")
  .get(getMenuById)
  .put(ensureAuthenticated, adminOnly, updateMenu);

export default router;
