const express = require('express');
const router = express.Router();
const { getAllSchools } = require('../controllers/SchoolController');

// GET /School/schools
router.get('/schools', getAllSchools);

module.exports = router;
