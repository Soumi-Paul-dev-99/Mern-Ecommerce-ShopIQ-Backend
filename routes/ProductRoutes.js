const express = require("express");
const { createProduct } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, createProduct);

module.exports = router;
