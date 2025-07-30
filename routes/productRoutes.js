import {
  brainTreePaymentController,
  brainTreeTokenController,
  categoryProductController,
  createProductController,
  deleteProductController,
  filterProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import ExpressFormidable from "express-formidable";
import express from "express";

const router = express.Router();

// Create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  createProductController
);

// Update Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  ExpressFormidable(),
  updateProductController
);

// Get Products
router.get("/get-product", getProductController);

// Single Product
router.get("/get-product/:slug", getSingleProductController);

// Get Photo
router.get("/product-photo/:pid", productPhotoController);

// Delete Product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

// Filter Products
router.post("/product-filter", filterProductController);

// Product Count
router.get("/product-count", productCountController);

// Products per Page
router.get("/product-list/:page", productListController);

// Search Products
router.get("/search/:keyword", searchProductController);

// Related Products
router.get("/related-product/:pid/:cid", relatedProductController);

// Category Products
router.get("/product-category/:slug", categoryProductController);

// Braintree Payment Routes
router.get("/braintree/token", brainTreeTokenController);

router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
