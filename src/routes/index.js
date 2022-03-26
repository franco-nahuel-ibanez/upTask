const router = require('express').Router();
const {body} = require('express-validator');

const proyectosController = require('../controllers/proyectosController');

module.exports = () => {

    router.get('/', proyectosController.proyectosHome );

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)

    router.post(
        '/nuevo-proyecto',
        body('nombre').notEmpty().trim().escape(),
        proyectosController.nuevoProyeto
    )

    return router;
}