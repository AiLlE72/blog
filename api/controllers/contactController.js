const contactModel = require('../models/contactModel')

module.exports = {
    get: (req, res) => {
        res.render('contact')
    }, 
    post: (req,res)=>{
        contactModel.create({
            email: req.body.email,
            content: req.body.content
        })
        res.redirect('/contact')
    }
}