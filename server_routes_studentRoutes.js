// studentRoutes.js
const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.get('/:bi', studentController.getStudentByBi);
router.post('/', studentController.addStudent);
router.post('/:bi/notas', studentController.addNote);

module.exports = router;
