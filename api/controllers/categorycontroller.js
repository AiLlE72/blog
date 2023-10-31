const categoryModel = require("../models/categoryModel")

module.exports = {
    get: async (req, res) => {
        const categories = await categoryModel.find().lean()
        res.render('form_list_category', {categories})
    },
    post: async (req, res) => {
        categoryModel.create({
            name: req.body.name
        })
        res.redirect('/categories')
    }, 
    delete: async (req, res) => {
        
        res.redirect('/categories')
    },
    update: async (req, res) => {
        
        res.redirect('/categories')
    }
}