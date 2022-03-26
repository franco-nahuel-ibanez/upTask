const Proyectos = require('../models/Proyectos');



exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll()
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};


exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyeto = async (req, res) => {
    const { nombre } = req.body;
    
    let errores = [];

    if(!nombre) { errores.push({'texto': 'Agrega un Nombre al Proyecto'}); }

    if(errores.length > 0){
        res.render('nuevoProyecto', { nombrePagina: 'Nuevo Proyecto', errores })
    }

    try {
        // const url = slug(nombre).toLowerCase();
        await Proyectos.create({ nombre }) 
        res.redirect('/');
    } catch (error) {
        console.log(error)        
    }
    
    
     
    
}   