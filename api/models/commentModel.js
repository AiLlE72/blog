const mongoose = require('mongoose')
const articleModel = require('./articleModel.js')
const userModel = require('./userModel.js')

const commentModel = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: userModel,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    article: { type: mongoose.Schema.Types.ObjectId, ref: articleModel }

}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentModel)