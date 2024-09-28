const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const users = require("./data/users");

// Crear instancia de la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Ruta de Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(403).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, "secret_key", { expiresIn: "1h" });
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful" });
});

// Importar y usar las rutas
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
