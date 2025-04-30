const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const Login = require('../models/Login'); // Importa el modelo Login

const secretKey = 'key'; // Cambiar a variables de entorno

exports.register = async (req, res) => {
    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      // Crear un nuevo usuario usando Sequelize
      const user = await Login.create({
        email: req.body.email,
        password: hashedPassword,
      });
  
      return res.status(201).json({ message: "Usuario creado correctamente", user });
    } catch (error) {
      return res.status(500).json({ message: "Error al registrar usuario", error });
    }
  };


  exports.login = async (req, res) => {
    try {
      const user = await Login.findOne({ where: { email: req.body.email } });
  
      if (!user) {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
  
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
        return res.status(200).json({ token, user: { email: user.email } });
      } else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
      }
    } catch (error) {
      console.error("Error en el login:", error);
      return res.status(500).json({ message: "Error al iniciar sesión", error });
    }
  };
  exports.getEmails = async (req, res) => {
    try {
      const emails = await Login.findAll({
        attributes: ['email'], // Selecciona solo la columna `email`
      });
      return res.status(200).json(emails);
    } catch (error) {
      console.error("Error al obtener correos:", error);
      return res.status(500).json({ message: "Error al obtener correos", error });
    }
  };