
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.proyectosHome = async (req, res) => {

    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }})
    
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};


exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }})
    
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyeto = async (req, res) => {
    const usuarioId = res.locals.usuario.id
    const proyectos = await Proyectos.findAll({where: { usuarioId }})
    
    const { nombre } = req.body;
    
    let errores = [];

    if(!nombre) { errores.push({'texto': 'Agrega un Nombre al Proyecto'}); }

    if(errores.length > 0){
        res.render('nuevoProyecto', { 
            nombrePagina: 'Nuevo Proyecto', 
            proyectos,
            errores 
        })
    }

    try {
        const usuarioId = res.locals.usuario.id
        await Proyectos.create({ nombre, usuarioId }) 
        res.redirect('/');
    } catch (error) {
        console.log(error)        
    }
}   


exports.proyectoPorUrl = async(req, res, next) => {
    const {url} = req.params;

    const usuarioId = res.locals.usuario.id
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }})

    const proyectoPromise = Proyectos.findOne({ 
        where: {
            url,
            usuarioId
        }
    });

    
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    if(!proyecto) return next()
    
    //consultar tareas de proyecto actual
    const tareas = await Tareas.findAll({ where: {proyectoId: proyecto.id} });

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyectos,
        proyecto,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const {id} = req.params;

    const usuarioId = res.locals.usuario.id
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }})

    const proyectoPromise = Proyectos.findOne({ 
        where: {
            id, 
            usuarioId}
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto',{
        nombrePagina: 'Editar Proyecto 1',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const { nombre } = req.body;
    const {id} = req.params;

    const proyectos = await Proyectos.findAll()
        
    let errores = [];

    if(!nombre) { errores.push({'texto': 'Agrega un Nombre al Proyecto'}); }

    if(errores.length > 0){
        res.render('nuevoProyecto', { 
            nombrePagina: 'Nuevo Proyecto', 
            proyectos,
            errores 
        })
    }

    try {
        await Proyectos.update(
            {nombre},
            {where: { id }}
        )

        res.redirect('/');
    } catch (error) {
        console.log(error)        
    }
}

exports.eliminarProyecto = async(req, res, next) => {
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if(!resultado) return next();

    res.send('Proyecto eliminado correctamente')
}





