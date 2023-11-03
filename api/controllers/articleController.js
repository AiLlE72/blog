const articleModel = require("../models/articleModel")
const categoryModel = require("../models/categoryModel")

module.exports = {
    getForm: async (req, res) => {
        const categories = await categoryModel.find().lean()
        res.render('form_article', { categories })
    },
    postForm: async (req, res) => {
        const category = await categoryModel.findById(req.body.category)
        await articleModel.create({
            title: req.body.title,
            author: req.body.author,
            category: category._id,
            content: req.body.content
        })
        res.redirect('/liste-articles')
    },
    getList: async (req, res) => {
        const articles = await articleModel.find({}).lean().populate('category').exec()
        console.log(articles);
        res.render('list_article', { articles })
    },
    delete: async (req, res) => {
        await articleModel.findByIdAndDelete(req.params._id)
        res.redirect('/liste-articles')
    },
    getUpdate: async (req, res) => {
        const article = await articleModel.findById(req.params._id).lean().populate('category').exec()
        console.log(article);
        const categories = await categoryModel.find().lean()
        res.render('form_article', { article, categories })
    },
    postUpdate: async (req, res) => {
        await articleModel.findByIdAndUpdate(req.params._id, {
            title: req.body.title,
            author: req.body.author,
            category: req.body.category,
            content: req.body.content
        })
        res.redirect('/liste-articles')
    }
}