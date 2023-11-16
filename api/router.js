const express = require('express')
const { check } = require('express-validator');

const router = express.Router()

const homeController = require('./controllers/homeController')
const contactController = require('./controllers/contactController')
const articleController = require('./controllers/articleController')
const categorycontroller = require('./controllers/categorycontroller');
const userController = require('./controllers/userController');
const commentController = require('./controllers/commentController');


const csrf = require('./middlewares/csrf')


router.route('/')
    .get(homeController.get)

/************************************
 *                                  *
 *      Gestion des contacts        *
 *                                  *
 ************************************/

router.route('/contact')
    .get(contactController.get)
    .post([
        check("email").exists().notEmpty().withMessage("votre formulaire est vide").isEmail().withMessage('votre formulaire n\'est pas un email').escape().trim(),
        check('content').exists().notEmpty().withMessage("votre contenu est vide").escape().trim()],
        contactController.post)


/************************************
 *                                  *
 *      Gestion des articles        *
 *                                  *
 ************************************/

router.route('/formulaire-article')
    .get(articleController.getForm)
    .post(csrf,[
        check('title').exists().notEmpty().escape().trim()
    ], articleController.postForm)

router.route('/liste-articles')
    .get(articleController.getList)

router.route('/effacer-article/:_id')
    .post(csrf, articleController.delete)

router.route('/article-modification/:_id')
    .get(articleController.getUpdate)
    .post(csrf, articleController.postUpdate)

router.route('/article/:_id')
    .get(articleController.getArticle)


/************************************
 *                                  *
 *      Gestion des categories      *
 *                                  *
 ************************************/
router.route('/categories')
    .get(categorycontroller.get)
    .post(csrf, categorycontroller.post)

router.route('/categories/effacer/:_id')
    .post(csrf, categorycontroller.delete)

router.route('/categories/modifier/:_id')
    .get(categorycontroller.getUpdate)
    .post(csrf, categorycontroller.postUpdate)

/************************************
 *                                  *
 *      Gestion des commentaires    *
 *                                  *
 ************************************/
router.route('/comment/:_id')
    .post(csrf, commentController.post)

/************************************
 *                                  *
 *      Gestion des Utilisateurs    *
 *                                  *
 ************************************/

router.route('/inscription')
    .get(userController.get)
    .post(csrf, userController.post)

router.route('/connexion')
    .get(userController.getConnect)
    .post(userController.postConnect)

router.route('/deconnexion')
    .post(csrf, userController.deco)


module.exports = router