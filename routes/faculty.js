const express = require('express');
const router = express.Router();
const FacultyController = require('../controllers/faculty');

router.post('/', FacultyController.createFaculty);
router.get('/', FacultyController.getAllFaculties);
router.put('/:id', FacultyController.updateFaculty);
router.delete('/:id', FacultyController.deleteFaculty);

module.exports = router;