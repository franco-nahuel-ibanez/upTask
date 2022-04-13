const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Referencia del modelo al que vamos a autenticar
const Usuarios = require('../models/Usuarios');

// local strategy 
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        //realizamos la consulta para verificar las credenciales
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({ where: { email }})
                //el usuario existe pero el password no es correcto
                if(!usuario.verificarPassword(password) ){
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }

                // el email existe y el password es correcto
                return done(null, usuario)
            } catch (error) {
                // ese usuario no existe
                return done(null, false, {
                    message: 'Cuenta no existente'
                })
            }
        }
    )
);


//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario)
})


//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario)
})


module.exports = passport;