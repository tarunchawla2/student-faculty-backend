const Subject = require('../models/subject');

exports.createSubject = (req, res, next) => {
    const subject = new Subject({
        name: req.body.name
    })
    subject.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.getAllSubjects = (req, res, next) => {
    Subject.find()
        .then(subjects => {
            res.status(200).json(subjects);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.deleteSubject = (req, res, next) => {
    const id = req.params.id;
    Subject.findOneAndDelete({ _id: id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.updateSubject = (req, res, next) => {
    const id = req.params.id;
    Subject.findByIdAndUpdate({ _id: id }, { $set: { name: req.body.name } }, { new: true })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}