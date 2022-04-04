const Sequelize = require('sequelize');
const db = require('../config/db');

const Tareas = db.define('tareas', {
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER
})


module.exports = Tareas;