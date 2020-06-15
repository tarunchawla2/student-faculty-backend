const express = require('express');
const router = express.Router();
const SubjectController = require('../controllers/subject');

router.post('/', SubjectController.createSubject);
router.get('/', SubjectController.getAllSubjects);
router.put('/:id', SubjectController.updateSubject);
router.delete('/:id', SubjectController.deleteSubject);

module.exports = router;