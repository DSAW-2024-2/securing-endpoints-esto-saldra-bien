const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token de la cookie
  const token = req.cookies.token;

  // Si no hay token, devolver error 403 (Forbidden)
  if (!token) {
    return res.status(403).json({ message: 'No JWT token provided' });
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, 'secreto'); // Cambia 'secreto' por tu clave secreta
    req.user = decoded; // Guardar el payload decodificado en `req.user`
    next(); // Si el token es válido, pasa al siguiente middleware/controlador
  } catch (err) {
    return res.status(403).json({ message: 'Invalid JWT Token' });
  }
};

module.exports = authMiddleware;
