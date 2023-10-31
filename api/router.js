const express = require('express')

const router = express.Router()

const homeController = require('./controllers/homeController')
const contactController = require('./controllers/contactController')
const articleController = require('./controllers/articleController')
const categorycontroller = require('./controllers/categorycontroller')


router.route('/')
    .get(homeController.get)

router.route('/contact')
    .get(contactController.get)
    .post(contactController.post)

router.route('/formulaire-article')
    .get(articleController.getForm)
    .post(articleController.postForm)

router.route('/liste-articles')
    .get(articleController.getList)

router.route('/effacer-article/:_id')
    .post(articleController.delete)

router.route('/article-modification/:_id')
    .get(articleController)

router.route('/categories')
    .get(categorycontroller.get)
    .post(categorycontroller.post)

router.route('/categories/effacer/:_id')
    .post(categorycontroller.delete)

router.route('/categories/modifier/:_id')
    .post(categorycontroller.update)

module.exports = router