const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No autorizado' });
    // Aquí podrías agregar lógica para verificar el token
    next();
  };
  
  module.exports = authMiddleware;
  