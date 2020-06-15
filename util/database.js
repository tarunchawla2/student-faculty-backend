const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/studentfacultyapp'

const connectMongo = () => {
    return mongoose.connect(MONGO_URL);
}

module.exports = connectMongo