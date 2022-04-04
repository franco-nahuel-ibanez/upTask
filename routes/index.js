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

    router.get(
        '/proyectos/:url',
        proyectosController.proyectoPorUrl
    );

    router.get(
        '/proyecto/editar/:id',
        proyectosController.formularioEditar
    )

    router.post(
        '/nuevo-proyecto/:id',
        body('nombre').notEmpty().trim().escape(),
        proyectosController.actualizarProyecto
    )

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)

    return router;
}