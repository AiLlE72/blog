const express = require('express')
const { engine } = require('express-handlebars')
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");

const mongoose = require('mongoose');

MomentHandler.registerHelpers(Handlebars);

const configDB = require('./configDB')
const router = require('./api/router')

const app = express()

const port = 5000


app.engine('hbs', engine({ extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))

app.use('/', router)

mongoose.connect(`mongodb+srv://${configDB.username}:${configDB.pass}@cluster0.6omxoln.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log('Connected!'));

app.listen(port, function () {
    console.log(`le serveur tourne sur http://localhost:${port}`);
})