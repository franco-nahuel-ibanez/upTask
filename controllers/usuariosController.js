const Usuarios = require('../models/Usuarios');


exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res) => {
    const {error} = res.locals.mensajes
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesion en Uptask',
        error
    })
}

exports.crearCuenta = async(req, res) => {
    const {email, password} = req.body;

    try {
        await Usuarios.create({
            email,
            password
        })
        res.redirect('/iniciar-sesion')
        
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message))

        res.render('crearCuenta', {
            nombrePagina: 'Crear Cuenta en Uptask',
            mensajes: req.flash(),
            email,
            password
        })        
    }   
}

exports.formReestablecerPass = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer Password'
    })
}

