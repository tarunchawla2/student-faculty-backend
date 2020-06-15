const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: [{
        type: mongoose.Types.ObjectId,
        ref: 'subject'
    }],
    imagePath: { type: String}
})

module.exports = mongoose.model('student', studentSchema)
// module.exports = studentSchema;