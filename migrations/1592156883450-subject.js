/**
 * Make any changes you need to make to the database here
 */
const Subject = require('../models/subject');
const mongoose = require('mongoose');

async function up() {
  // Write migration here
  if (mongoose.connection.readyState != mongoose.STATE_OPEN) {
    await mongoose.connect('mongodb://localhost:27017/studentfacultyapp');
  }
  await Subject.createCollection({
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name']
      },
    },
    validationLevel: 'strict',
    validationAction: 'error',
  })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
