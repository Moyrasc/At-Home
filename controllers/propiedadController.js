import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad } from '../models/index.js'

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
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: {}
    })
}
const guardar = async (req, res) => {
    //Resultado validacion
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return res.render('propiedades/crear', {
            pagina: 'Crear Inmueble',
            barra: true,
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }
    //Crear registro
    const { titulo, descripcion, habitaciones, wc, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    admin,
    crear,
    guardar
}