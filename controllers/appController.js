import { Precio, Categoria, Propiedad } from '../models/index.js'

const inicio = async ( req, res ) => {

    const [ categorias, precios ] = await Promise.all([
        Categoria.findAll({ raw: true }),
        Precio.findAll({ raw: true })
    ])
    res.render('inicio',{
        pagina: 'Inicio',
        categorias,
        precios
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