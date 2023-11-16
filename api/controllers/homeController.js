const articleModel = require("../models/articleModel")

module.exports = {
    get: async (req, res) => {
        const articles = await articleModel.find().lean()
        const lastArticle = articles[articles.length-1]
        res.render('home', {lastArticle, active: {home: true}})
    }
}