const express = require('express');
const router = express.Router();
const SignatureController = require('../controllers/SignatureController');

// Ruta para crear una nueva Sig
router.post('/create', SignatureController.createSignature);
// Ruta para obtener todas las Sigs
router.get('/signatures', SignatureController.getSignatures);

module.exports = router;