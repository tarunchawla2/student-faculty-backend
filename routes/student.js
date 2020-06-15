const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student');
const extractFile = require('../middleware/file');


router.post('/', extractFile, StudentController.createStudent);
router.get('/', StudentController.getAllStudents);
router.put('/:id', extractFile, StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

module.exports = router;