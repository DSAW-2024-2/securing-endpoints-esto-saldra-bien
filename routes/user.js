const express = require("express");
const router = express.Router();
const users = require("../data/users");
const auth = require("../middleware/auth");

// Obtener todos los usuarios
router.get("/", auth, (req, res) => {
  res.json(users);
});

// Crear un nuevo usuario
router.post("/", (req, res) => {
  const { name, email, age, password } = req.body;
  const newUser = { id: users.length + 1, name, email, age, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Obtener un usuario por ID
router.get("/:id", auth, (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

// Actualizar un usuario por ID
router.put("/:id", auth, (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.name = req.body.name || user.name;
  res.json(user);
});

// Eliminar un usuario
router.delete("/:id", auth, (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

module.exports = router;
