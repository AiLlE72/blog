const articleModel = require("../models/articleModel")

module.exports = {
    getForm: (req, res) => {
        res.render('form_article')
    },
    postForm: (req, res) => {
        articleModel.create({
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            content: req.body.content
        })
        res.redirect('/liste-articles')
    },
    getList: async (req, res)=>{
        const articles = await articleModel.find({}).lean()
        console.log(articles);
        res.render('list_article', {articles})
    },
    delete:async (req,res)=>{
        await articleModel.findByIdAndDelete(req.params._id)
        res.redirect('/liste-articles')
    }
}