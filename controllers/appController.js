import { Precio, Categoria, Propiedad } from '../models/index.js'

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
        })
    ])
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
    
    res.render('inicio',{
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        pisos
    })
}

const categoria = ( req, res ) => {

}

const buscador = ( req, res ) => {

}

const notFound = ( req, res ) => {

}
export {
    inicio,
    categoria,
    buscador,
    notFound
}