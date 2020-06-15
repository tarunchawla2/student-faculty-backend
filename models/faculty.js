const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Types.ObjectId,
        ref:'subject'
    }]
    // subjects: {
    //     subjectId: [{
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Subject'
    //     }]
    // }
    // subjects: [{
    //     subjectId: {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Subject'
    //     }
    // }]
})

module.exports = mongoose.model('faculty', facultySchema)