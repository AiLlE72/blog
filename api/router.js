const express = require('express')
const {  check } = require('express-validator');

const router = express.Router()

const homeController = require('./controllers/homeController')
const contactController = require('./controllers/contactController')
const articleController = require('./controllers/articleController')
const categorycontroller = require('./controllers/categorycontroller');
const userController = require('./controllers/userController');

const log = require('./middlewares/test')

router.route('/')
    .get(homeController.get)

router.route('/contact')
    .get(contactController.get)
    .post([check("email").notEmpty().withMessage("votre formulaire est vide")
        .isEmail().withMessage('votre formulaire n\'est pas un email').escape(),
        check('content').notEmpty().withMessage("votre contenu est vide").escape()],
        contactController.post)

router.route('/formulaire-article')
    .get(articleController.getForm)
    .post(articleController.postForm)

router.route('/liste-articles')
    .get(articleController.getList)

router.route('/effacer-article/:_id')
    .post(articleController.delete)

router.route('/article-modification/:_id')
    .get(articleController.getUpdate)
    .post(articleController.postUpdate)

router.route('/categories')
    .get(categorycontroller.get)
    .post(categorycontroller.post)

router.route('/categories/effacer/:_id')
    .post(categorycontroller.delete)

router.route('/categories/modifier/:_id')
    .get( categorycontroller.getUpdate)
    .post(categorycontroller.postUpdate)

router.route('/inscription')
    .get( userController.get)
    .post(userController.post)

router.route('/connexion')
    .get( userController.getConnect)
    .post(userController.postConnect)

router.route('/deconnexion')
    .post(userController.deco)
    

module.exports = router