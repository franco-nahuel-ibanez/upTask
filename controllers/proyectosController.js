const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll()
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
};


exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll()
    
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyeto = async (req, res) => {
    const proyectos = await Proyectos.findAll()
    
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
        // const url = slug(nombre).toLowerCase();
        await Proyectos.create({ nombre }) 
        res.redirect('/');
    } catch (error) {
        console.log(error)        
    }
}   


exports.proyectoPorUrl = async(req, res, next) => {
    const {url} = req.params;

    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({ 
        where: {url}
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
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({ 
        where: {id}
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





