const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//lista de profesores con cedula** 
// agregar un change password
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/emails', authController.getEmails); // Nueva ruta para obtener correos

module.exports = router;