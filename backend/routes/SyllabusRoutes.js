const express = require('express');
const router = express.Router();
const SyllabusController = require('../controllers/SyllabusController');

// Ruta para crear una nueva Syllabus
router.post('/create', SyllabusController.createSyllabus);

module.exports = router;