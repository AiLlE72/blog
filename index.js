// importation de module
const express = require('express')
const { engine } = require('express-handlebars')
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
const helmet = require('helmet')
const crypto = require('crypto')
const session = require('express-session')
const mongoose = require('mongoose');
const path = require('path');

// importation de fichier
const configDB = require('./configDB')
const router = require('./api/router');

// creation des constante
const app = express()
const port = 5000

// parametrage express-handlebars
app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

// parametrage de moment (gestion de l'affichage des date)
MomentHandler.registerHelpers(Handlebars);

// parametrage d'hlemet (entete html pour la protection xss)
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "cdn.jsdelivr.net"],
            },
        },
    })
);

// paramtrage du systeme de session 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

//fonction pour généré un clé csrf
function generateCsrfToken() {
    return crypto.randomBytes(16).toString('hex')
}


//Placé le code csrf de la session en local ou en généré un si il n'existe pas 
app.use((req, res, next) => {
    res.locals.csrf = req.session.csrfToken || (req.session.csrfToken = generateCsrfToken());
    next();
});

// mettre en local l'email de l'utilisateur si la session utilisateur existe
app.use((req, res, next) => {
    if (!req.session.userId) {
        next()
    } else {
        res.locals.email = req.session.email
        next()
    }
})

// déclaré via un alias l'emplacement d'un fichier statique pour les contenu type image/css/js
app.use('/public', express.static(path.join(__dirname, 'assets')))

// parametrage de l'encodage des fichiers
app.use(express.urlencoded({ extended: true }))

// parametrage du router
app.use('/', router)

// conenxion a la base de donnée
mongoose.connect(`mongodb+srv://${configDB.username}:${configDB.pass}@cluster0.6omxoln.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connected!'));

// mise en ecoute du serveur web
app.listen(port, function () {
    console.log(`le serveur tourne sur http://localhost:${port}`);
})