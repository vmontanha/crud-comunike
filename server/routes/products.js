import express from "express";

import { getProducts, getSales, createProduct, deleteProduct, updateProduct, createSales } from "../controllers/products.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/sales", getSales);
router.get("/sale", createSales);
router.post("/product", createProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);

export default router;