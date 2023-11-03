const categoryModel = require("../models/categoryModel")

module.exports = {
    get: async (req, res) => {
        const categories = await categoryModel.find().lean()
        res.render('form_list_category', { categories })
    },
    post: async (req, res) => {
        await categoryModel.create({
            name: req.body.name
        })
        res.redirect('/categories')
    },
    delete: async (req, res) => {
        await categoryModel.findByIdAndDelete(req.params._id)
        res.redirect('/categories')
    },
    getUpdate: async (req, res) => {
        const categories = await categoryModel.find().lean()
        const category = await categoryModel.findById(req.params._id).lean()
        res.render('form_list_category', { categories, category })
    },
    postUpdate: async (req, res) => {
        await categoryModel.findByIdAndUpdate(req.params._id, {
            name: req.body.name
        })

        res.redirect('/categories')
    }
}