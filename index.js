const express = require('express');
const router = require('./routes');
const path = require('path');
const db = require('./config/db');

require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then( () => console.log('base de datos conectada'))
    .catch(err => console.log('error en base de datos', err))

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.urlencoded({extended: false}))
app.use(express.json());


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(__dirname + '/public'));



app.use('/', router());


app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})



