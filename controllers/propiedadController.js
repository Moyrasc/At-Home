import Precio from '../models/Precio.js';
import Categoria from '../models/Categoria.js'

const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Inmuebles',
        barra: true
    })

}
//Formulario crear un Inmueble nuevo
const crear = async (req, res) => {
    //Consultar modelo precio y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/crear', {
        pagina: 'Crear Inmueble',
        barra: true,
        categorias,
        precios
    })
}

export {
    admin,
    crear
}