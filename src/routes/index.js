const router = require('express').Router();

const proyectosController = require('../controllers/proyectosController');

module.exports = () => {

    router.get('/', proyectosController.proyectosHome );

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto)

    router.post('/nuevo-proyecto', proyectosController.nuevoProyeto)

    return router;
}