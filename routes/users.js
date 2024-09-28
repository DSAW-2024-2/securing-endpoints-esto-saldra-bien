const express = require('express');
const router = express.Router();
const users = require('../data/users');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todos los usuarios (requiere autenticación)
router.get('/', authMiddleware, (req, res) => {
  res.json(users);
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Obtener un usuario por ID (requiere autenticación)
router.get('/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json(user);
});

// Actualizar un usuario por ID (requiere autenticación)
router.put('/:id', authMiddleware, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// Eliminar un usuario por ID (requiere autenticación)
router.delete('/:id', authMiddleware, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser);
});

// Login de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = jwt.sign({ email: user.email }, 'secreto', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true });
  res.json({ message: 'Inicio de sesión exitoso' });
});

module.exports = router;
