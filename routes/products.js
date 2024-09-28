const express = require('express');
const router = express.Router();
const products = require('../data/products');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(products);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
});

// Crear un nuevo producto (requiere autenticación)
router.post('/', authMiddleware, (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto por ID (requiere autenticación)
router.put('/:id', authMiddleware, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// Eliminar un producto por ID (requiere autenticación)
router.delete('/:id', authMiddleware, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct);
});

module.exports = router;
