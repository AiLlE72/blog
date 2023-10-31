const mongoose = require('mongoose')

const categoryModel = new mongoose.Schema({
    name: String,
    
}, {
    timestamps: true
})

module.exports = mongoose.model('category', categoryModel)