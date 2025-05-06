const express = require('express');
const router = express.Router();
const ProgramController = require('../controllers/ProgramController');

// Ruta para crear una nueva Program
router.post('/create', ProgramController.createProgram);
// Ruta para obtener todos los programas
router.get('/programs', ProgramController.getPrograms);

module.exports = router;