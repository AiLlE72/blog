const { query, validationResult } = require('express-validator')
const contactModel = require('../models/contactModel')

module.exports = {
    get: (req, res) => {
        res.render('contact')
    }, 
    post: (req,res)=>{
        
           const result = validationResult(req)
        if (!result.isEmpty()) {
            console.log(result.errors)
            return res.status(422).render('contact', {errors : result.errors})
        }


        contactModel.create({
            email: req.body.email,
            content: req.body.content
        })
        res.redirect('/contact')
    }
}