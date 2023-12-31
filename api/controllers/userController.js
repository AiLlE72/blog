const userModel = require("../models/userModel")

module.exports = {
    get: async (req, res) => {
        res.render('register',  {active: {register: true}})
    },
    post: (req, res) => {
        console.log(req.body);
        if (req.body.password !== req.body.confPassword) {
            return res.redirect('back')
        } else {
            userModel.create({
                email: req.body.email,
                password: req.body.password
            })
        }
        res.redirect('/')
    },
    getConnect: (req, res) => {
        res.render('connect',  {active: {connexion: true}})
    },
    postConnect: async (req, res) => {
        const user = await userModel.findOne({ email: req.body.email }).lean()
        if (!user) {
            return res.redirect('/inscription')
        } else {
            //viendra controler le mot de passe
            if (user.password !== req.body.password) {
                return res.redirect('/inscription')
            } 
            req.session.userId = user._id
            req.session.email = user.email
            res.redirect('/')
        }
    },
    deco: (req, res)=> {
        req.session.destroy()
        console.log(req.session);
        res.redirect('/')
    }
}