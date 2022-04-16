const passport = require('passport');
const Usuario = require('../models/Usuarios');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const enviarEmail = require('../handler/email')


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

    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    
    await usuario.save();

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`

    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecerPassword'
    })

    req.flash('correcto', 'Se envio un mensaje a tu correo')
    res.redirect('/iniciar-sesion')

}


exports.validarToken = async(req, res) => {
    const usuario = await Usuario.findOne({ where: {token: req.params.token}})
    
    if(!usuario){
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    res.render('resetPassword',{
        nombrePagina: 'Reestablecer Password'
    })
}


exports.actualizarPassword = async(req, res) => {
    const {token} = req.params
    const {password} = req.body
    const usuario = await Usuario.findOne({where: {
        token,
        expiracion: {
            [Op.gte]: Date.now()
        }
    }});

    if(!usuario){
        req.flash('error', 'No valido')
        res.redirect('/reestablecer')
    }

    usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));        
    usuario.token = null
    usuario.expiracion = null

    await usuario.save()

    req.flash('correcto', 'Tu password se ha modificado correctamente')
    res.redirect('/iniciar-sesion')
}
