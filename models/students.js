const mongoose = require('mongoose')
const Schema = mongoose.Schema
const student = new Schema({
  empid: Number,
  firstname: String,
  lastname: String,
  createdatetime: Date
})

module.exports = mongoose.model('students_62672', student)
