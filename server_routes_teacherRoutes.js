// teacherRoutes.js
const express = require('express');
const teacherController = require('../controllers/teacherController');
const router = express.Router();

router.post('/', teacherController.addTeacher);

module.exports = router;
