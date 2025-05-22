const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Login = require('../models/Login');
const UserProfile = require('../models/UserProfile');

const secretKey = process.env.SECRET_KEY || 'key';

exports.register = async (req, res) => {
  const { email, password, role, name, school } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const login = await Login.create({ email, password: hashedPassword });

    const userProfile = await UserProfile.create({
      login_id: login.login_id,
      role,
      name,
      school,
    });

    return res.status(201).json({ message: 'Usuario registrado correctamente', login, userProfile });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await Login.findOne({ where: { email }, include: UserProfile });

    if (!login) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await bcrypt.compare(password, login.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: login.login_id, email: login.email }, secretKey, { expiresIn: '1h' });

    return res.status(200).json({
      token,
      user: {
        email: login.email,
        role: login.UserProfile.role, // Incluye el rol
        name: login.UserProfile.name,
        school: login.UserProfile.school, // Incluye la escuela
      },
    });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

exports.getEmails = async (req, res) => {
  try {
    // Obtener todos los correos electrónicos de la tabla Login
    const emails = await Login.findAll({
      attributes: ['email'], // Solo seleccionamos el campo email
    });

    // Devolver los correos electrónicos en la respuesta
    return res.status(200).json(emails);
  } catch (error) {
    console.error('Error al obtener los correos electrónicos:', error);
    return res.status(500).json({ message: 'Error al obtener los correos electrónicos', error });
  }
};