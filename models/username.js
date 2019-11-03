const mongoose = require('mongoose')
const Schema = mongoose.Schema
const username = new Schema({
  username: String,
  password: String,
  createdatetime: Date
})

module.exports = mongoose.model('usernames', username)
