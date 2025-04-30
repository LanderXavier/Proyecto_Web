// middleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'key'; // Utiliza una variable de entorno para almacenar la clave

// Middleware para verificar el token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).json({ message: 'Token requerido' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido o expirado' });

    req.user = decoded; // Guardamos el usuario decodificado para usarlo más tarde
    next();
  });
}

module.exports = { verificarToken };
