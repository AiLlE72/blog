const { validationResult } = require('express-validator')
const contactModel = require('../models/contactModel')

module.exports = {
    get: (req, res) => {
        res.render('contact')
    },
    post: (req, res) => {
        if (req.session.csrf !== req.body.csrf) {
            //sinon je renvoi une erreur 
            return res.status(403).render('contact')


        } 
        const result = validationResult(req)
        if (!result.isEmpty()) {
            // console.log(result.errors)
            return res.status(422).render('contact', { errors: result.errors })
        }

        console.log(req.body);
        contactModel.create({
            email: req.body.email,
            content: req.body.content
        })
        res.redirect('/contact')
    }
}