const express = require('express');
const router = require('./routes');
const path = require('path');
const db = require('./config/db');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
    .then( () => console.log('base de datos conectada'))
    .catch(err => console.log('error en base de datos', err))

const app = express();
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));


app.use(express.urlencoded({extended: false}))
app.use(express.json());

//app messages
app.use(flash());

app.use(cookieParser());

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use( (req, res, next) => {
    console.log(req.user)
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null
    
    next()
})


app.use('/', router());


app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})




