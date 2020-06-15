const Faculty = require('../models/faculty')
const Subject = require('../models/subject');

exports.createFaculty = (req, res, next) => {
    const faculty = new Faculty({
        name: req.body.name
    })
    Subject.find({ 'name': { $in: req.body.subjects } })
        .then(subjects => {
            faculty.subjects = subjects;
            faculty.save()
                .then(result => {
                    res.status(201).json(result);
                })
        })
        .catch(err => {
            res.status(400).json(err)
        })
}
exports.getAllFaculties = (req, res, next) => {
    Faculty.find()
        .populate('subjects')
        .then(faculties => {
            res.status(200).json(faculties);
        })
        .catch(err => {
            res.status(500).json(err);
        })
}
exports.deleteFaculty = (req, res, next) => {
    const id = req.params.id;
    Faculty.findByIdAndDelete({ _id: id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
exports.updateFaculty = (req, res, next) => {
    console.log('updated')
    const id = req.params.id;
    Subject.find({ 'name': { $in: req.body.subjects } })
        .then(subjects => {
            Faculty.findByIdAndUpdate({ _id: id }, { $set: { name: req.body.name, subjects: subjects } }, { new: true })
                .populate('subjects')
                .then(result => {
                    res.status(200).json(result)
                })
        })
        .catch(err => {
            res.status(500).json(err);
        })
}