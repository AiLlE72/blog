const express = require('express')
const { engine } = require('express-handlebars')
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
const helmet = require('helmet')
const crypto = require('crypto')
const session = require('express-session')


const mongoose = require('mongoose');

MomentHandler.registerHelpers(Handlebars);

const configDB = require('./configDB')
const router = require('./api/router')

const app = express()

const port = 5000


app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'", "cdn.jsdelivr.net"],
            },
        },
    })
);

//csrf
function generateCsrfToken() {
    return crypto.randomBytes(16).toString('hex')
}
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    
    
  }))

app.use((req, res, next)=>{
    if (!req.session.userId) {
        next()
    }else{
        if (!req.session.csrf) {
            req.session.csrf = generateCsrfToken() 
        }
        res.locals.csrf = req.session.csrf  
        next()
    }
    
})


app.use(express.urlencoded({ extended: true }))

app.use('/', router)

mongoose.connect(`mongodb+srv://${configDB.username}:${configDB.pass}@cluster0.6omxoln.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connected!'));

app.listen(port, function () {
    console.log(`le serveur tourne sur http://localhost:${port}`);
})