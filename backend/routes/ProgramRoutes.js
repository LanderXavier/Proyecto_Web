const express = require('express');
const router = express.Router();
const ProgramController = require('../controllers/ProgramController');

// Ruta para crear una nueva Program
router.post('/create', ProgramController.createProgram);
// Ruta para obtener todos los programas (cambiar nombre**)
router.get('/programs', ProgramController.getPrograms);
// Ruta para eliminar un programa por ID
router.delete('/:id', ProgramController.deleteProgram);
// Ruta para actualizar el estado de un programa por ID
router.patch('/:id/estado', ProgramController.updateEstado);

module.exports = router;