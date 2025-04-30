const express = require('express');
const router = express.Router();
const signatureController = require('../controllers/signatureController');

// Ruta para crear una nueva signature
router.post('/create', signatureController.createSignature);

module.exports = router;