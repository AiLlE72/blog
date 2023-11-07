const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user', userModel)