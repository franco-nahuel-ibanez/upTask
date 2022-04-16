const passport = require('passport');
const Usuario = require('../models/Usuarios');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
})

//funcion para revisar si el usuario esta logueado
exports.usuarioAutenticado = (req, res, next) => {

    // si el usuario esta autenticado 
    if(req.isAuthenticated()){
        return next()
    }

    // si no esta autenticado, redirigir
    return res.redirect('/iniciar-sesion');
}

exports.cerrarSesion = async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

exports.enviarToken = async(req, res) => {
    const {email} = req.body
    const usuario = await Usuario.findOne({where: { email }})

    if(!usuario){
        req.flash('error', 'Cuenta no existente')
        res.render('reestablecer', {
            nombrePagina: 'Reestablecer Password',
            mensajes: req.flash()
        })
    }

    
}
