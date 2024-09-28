const express = require("express");
const router = express.Router();
const orders = require("../data/orders");
const users = require("../data/users");
const products = require("../data/products");
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json(orders);
});

router.post("/", auth, (req, res) => {
  const { userId, productId, quantity } = req.body;
  const user = users.find(u => u.id == userId);
  const product = products.find(p => p.id == productId);
  if (!user || !product) {
    return res.status(404).json({ message: "User or product not found" });
  }
  const newOrder = { id: orders.length + 1, userId, productId, quantity, status: "pending" };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Similar para GET/:id...

module.exports = router;
