const express = require('express');
const router = express.Router();
const SyllabusController = require('../controllers/SyllabusController');
const { getAllSyllabus } = require('../controllers/SyllabusController');


// Ruta para crear una nueva Syllabus
router.post('/create', SyllabusController.createSyllabus);
// obtener los syllabus
router.get('/syllabus', getAllSyllabus);//filtros
//crear update**
router.delete('/:id', SyllabusController.deleteSyllabus);
router.patch('/:id/estado', SyllabusController.updateEstado);

module.exports = router;