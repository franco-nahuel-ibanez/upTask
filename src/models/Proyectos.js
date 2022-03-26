const Sequelize = require('sequelize');
const db = require('../config/db');
// const sequelize = new Sequelize()

const Proyectos = db.define('proyectos', {
    id :{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING
})

module.exports = Proyectos