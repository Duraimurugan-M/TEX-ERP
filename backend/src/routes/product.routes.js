import express from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deactivateProduct,
} from "../controllers/product.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createProduct);
router.get("/", protect, getProducts);
router.put("/:id", protect, updateProduct);
router.patch("/deactivate/:id", protect, deactivateProduct);

export default router;