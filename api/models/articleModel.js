const mongoose = require('mongoose')
const categoryModel = require('./categoryModel.js')

const ArticleModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: categoryModel },
        
    content: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('article', ArticleModel)