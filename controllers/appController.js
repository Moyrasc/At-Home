import { Precio, Categoria, Propiedad } from '../models/index.js'
import { Sequelize } from 'sequelize';

const inicio = async ( req, res ) => {

    const [ categorias, precios, casas, pisos ] = await Promise.all([
        Categoria.findAll({ raw: true }),
        Precio.findAll({ raw: true }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 1
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ] 
            }),
        Propiedad.findAll({
            limit: 3,
            where: {
                categoriaId: 4
            },
            include: [
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ] 
        })
    ])
    res.render('inicio',{
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        pisos,
        csrfToken: req.csrfToken()
    })
};

const categoria = async ( req, res ) => {

    const { id } = req.params
    console.log(id)
    // Comprobar que categoria existe
    const categoria = await Categoria.findByPk(id)

    if(!categoria){
        return res.redirect('/404')
    }
    //obtener propiedades de la categoria
    const propiedades = await Propiedad.findAll({
        where: {
            categoriaId: id
        },
        include: [
            {model: Precio, as:'precio'}
        ]
    })
    res.render('categoria',{
        pagina:`${categoria.nombre}s en Venta`,
        propiedades,
        csrfToken: req.csrfToken()
    })
};

const buscador = async ( req, res ) => {
    const { termino } = req.body

    //Validar que el termino no este vacio
    if(!termino.trim()){
        return res.redirect('back')
    }
    //Consultar propiedades
    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Sequelize.Op.like] : '%' + termino + '%'
            }
        },
        include: [
            { model: Precio, as: 'precio' }
        ]
    })
    res.render('busqueda', {
        pagina:'Resultados de la Búsqueda',
        propiedades,
        csrfToken: req.csrfToken()
    })
};

const noEncontrado = ( req, res ) => {
    res.render('404', {
        pagina:'404-No Encontrado',
        csrfToken: req.csrfToken()
    })
    
}
export {
    inicio,
    categoria,
    buscador,
    noEncontrado
}