const router = require('express').Router();

const proyectosController = require('../controllers/proyectosController');

module.exports = () => {

    router.get('/', proyectosController.proyectosHome )


    return router;
}