const express = require('express');
const router = express.Router();
const orders = require('../data/orders');
const users = require('../data/users');
const products = require('../data/products');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los pedidos (requiere autenticación)
router.get('/', authMiddleware, (req, res) => {
  res.json(orders);
});

// Obtener un pedido por ID (requiere autenticación)
router.get('/:id', authMiddleware, (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
  res.json(order);
});

// Crear un nuevo pedido (requiere autenticación)
router.post('/', authMiddleware, (req, res) => {
  const { userId, productId, quantity } = req.body;
  const user = users.find(u => u.id === userId);
  const product = products.find(p => p.id === productId);

  if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });
  if (!product) return res.status(400).json({ message: 'Producto no encontrado' });

  const newOrder = {
    id: (orders.length + 1).toString(),
    userId,
    productId,
    quantity,
    status: 'Pending'
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Actualizar un
router.put('/:id', authMiddleware, (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Pedido no encontrado' });
  orders[index] = { ...orders[index], ...req.body };
  res.json(orders[index]);
});

// Eliminar un pedido por ID (requiere autenticación)
router.delete('/:id', authMiddleware, (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Pedido no encontrado' });
  const deletedOrder = orders.splice(index, 1);
  res.json(deletedOrder);
});

module.exports = router;
