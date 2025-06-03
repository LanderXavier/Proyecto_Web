const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./models/db');
const Login = require('./models/Login');
const SyllabusRoutes = require('./routes/SyllabusRoutes');
const ProgramRoutes = require('./routes/ProgramRoutes');
const Signature = require('./models/signature');
const SignatureRoutes = require('./routes/SignatureRoutes');
const SchoolRoutes = require('./routes/SchoolRoutes');




const app = express();


sequelize.sync({ force: false }) // Cambia a `true` para reiniciar tablas (solo en desarrollo)
  .then(() => console.log('Base de datos sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

  

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes); // Esto significa que todas las rutas de authRoutes tendrán el prefijo /auth
// Agregar las rutas de Syllabus
app.use('/Syllabus', SyllabusRoutes);
// Agregar las rutas de Program
app.use('/Program', ProgramRoutes);
// Agrefar las rutas de signature
app.use('/Signature', SignatureRoutes);
// Agregar las rutas de School
app.use('/School', SchoolRoutes);



// Iniciar servidor
// app.listen(8081, () => {
//   console.log('Server is running on port 8081');
// });

app.listen(8000, '0.0.0.0', () => {
  console.log('Server is running on port 8000');
});