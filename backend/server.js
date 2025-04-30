const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./models/db');
const Login = require('./models/Login');

const app = express();


sequelize.sync({ force: false }) // Cambia a `true` para reiniciar tablas (solo en desarrollo)
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes); // Esto significa que todas las rutas de authRoutes tendrán el prefijo /auth
// Iniciar servidor
app.listen(8081, () => {
  console.log('Server is running on port 8081');
});