const express = require("express");
const router = express.Router();
const products = require("../data/products");
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json(products);
});

router.post("/", auth, (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = { id: products.length + 1, name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Similar para GET/:id, PUT/:id, DELETE/:id...

module.exports = router;
