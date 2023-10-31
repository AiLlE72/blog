const mongoose = require('mongoose')

const contactModel = new mongoose.Schema({
    email: String,
    content: String
})

module.exports = mongoose.model('contact', contactModel)