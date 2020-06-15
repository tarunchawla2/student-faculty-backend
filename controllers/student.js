const Student = require('../models/student');
const Subject = require('../models/subject');

exports.createStudent = (req, res, next) => {
    req.body.subjects = JSON.parse(req.body.subjects);
    const url = req.protocol + '://' + req.get("host");
    const student = new Student({
        name: req.body.name,
        imagePath: req.file ? url + "/images/" + req.file.filename : ''
    })
    Subject.find({ 'name': { $in: req.body.subjects } })
        .then(subjects => {
            student.subjects = subjects;
            student.save()
                .then(result => {
                    res.status(201).json(result);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
}
exports.getAllStudents = (req, res, next) => {
    Student.find()
        .populate('subjects')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
exports.deleteStudent = (req, res, next) => {
    const id = req.params.id;
    console.log('Inside delete')
    Student.findByIdAndDelete({ _id: id })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
exports.updateStudent = (req, res, next) => {
    req.body.subjects = JSON.parse(req.body.subjects);
    const id = req.params.id;
    const url = req.protocol + '://' + req.get("host");
    const updatedImagePath = req.file ? url + "/images/" + req.file.filename : req.body.imagePath

    Subject.find({ 'name': { $in: req.body.subjects } })
        .then(subjects => {
            if (req.file) {
                Student.findByIdAndUpdate({ _id: id }, {
                    $set: {
                        name: req.body.name, subjects: subjects, imagePath: updatedImagePath
                    }
                }, { new: true })
                    .populate('subjects')
                    .then(result => {
                        res.status(200).json(result)
                    })
            } else {
                Student.findByIdAndUpdate({ _id: id }, {
                    $set: {
                        name: req.body.name, subjects: subjects
                    }
                }, { new: true })
                    .populate('subjects')
                    .then(result => {
                        res.status(200).json(result)
                    })
            }

        })
        .catch(err => {
            console.log('err', err)
            res.status(500).json(err);
        })
}