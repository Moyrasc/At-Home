import { unlink } from 'node:fs/promises'
import { validationResult } from 'express-validator';
import { Precio, Categoria, Propiedad } from '../models/index.js'

const admin = async (req, res) => {

    const { id } = req.usuario;
    const propiedades = await Propiedad.findAll({
        where: {
            usuarioId: id
        },
        include: [
            { model: Categoria },
            { model: Precio }
        ]
    })
    res.render('propiedades/admin', {
        pagina: 'Mis Inmuebles',
        propiedades,
        csrfToken: req.csrfToken(),

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
            csrfToken: req.csrfToken(),
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
        })
    }
    //Crear registro
    const { titulo, descripcion, habitaciones, wc, garaje, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body
    const { id: usuarioId } = req.usuario
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            wc,
            garaje,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen: ''
        })
        const { id } = propiedadGuardada
        res.redirect(`/propiedades/agregar-imagen/${id}`)
    } catch (error) {
        console.log(error)
    }
}

const agregarImagen = async (req, res) => {
    const { id } = req.params

    //Validar que exista el inmueble
    const propiedad = await Propiedad.findByPk(id)

    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    //Validar que no este publicada
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }
    //Validar que la propiedad pertenece al usuario
    if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
        return res.redirect('/mis-propiedades')
    }
    res.render('propiedades/agregar-imagen', {
        pagina: `Agregar imágenes de: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        propiedad
    })
}

const almacenarImagen = async (req, res, next) => {
    const { id } = req.params
    //Validar que exista el inmueble
    const propiedad = await Propiedad.findByPk(id)
    if (!propiedad) {
        return res.redirect('/mis-propiedades')
    }
    //Validar que no este publicada
    if (propiedad.publicado) {
        return res.redirect('/mis-propiedades')
    }
    //Validar que la propiedad pertenece al usuario
    if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
        return res.redirect('/mis-propiedades')
    }
    try {
        console.log(req.file)
        //Almacenar imagen y publicar propiedad
        propiedad.imagen = req.file.filename;
        propiedad.publicado = 1

        await propiedad.save()
        next()
    } catch (error) {
        console.log(error)
    }


}
const editar = async( req, res ) => {
    const { id } = req.params

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return  res.redirect("/mis-propiedades")
    }
    //Validar que la propiedad pertenece al usuario
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return   res.redirect("/mis-propiedades" );
    }
    const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
    ])
    res.render('propiedades/editar', {
        pagina: `Editar Inmueble: ${propiedad.titulo}`,
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        datos: propiedad
    })

}

const guardarCambios = async (req, res) => {
    //Verificar validacion
    let resultado = validationResult(req)
    if (!resultado.isEmpty()) {
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])

        return res.render('propiedades/editar', {
        pagina: 'Editar Inmueble',
        csrfToken: req.csrfToken(),
        categorias,
        precios,
        errores: resultado.array(),
        datos: req.body
    })
    }

    const { id } = req.params
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return  res.redirect("/mis-propiedades")
    }
    //Validar que la propiedad pertenece al usuario
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return   res.redirect("/mis-propiedades" );
    }
    //Reescribir Obj y actualizar
    try {
        const { titulo, descripcion, habitaciones, wc, garaje, calle, lat, lng, precio: precioId, categoria: categoriaId } = req.body
        propiedad.set({
            titulo, 
            descripcion, 
            habitaciones, 
            wc, 
            garaje, 
            calle, 
            lat, 
            lng, 
            precioId, 
            categoriaId 
        })
        await propiedad.save()
        res.redirect('mis-propiedades')
    } catch (error) {
        console.log(error)
    }
}
const eliminar = async (req, res) => {

    const { id } = req.params
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    if(!propiedad){
        return  res.redirect("/mis-propiedades")
    }
    //Validar que la propiedad pertenece al usuario
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return   res.redirect("/mis-propiedades" );
    }
    //Eliminar Imagen
    await unlink(`public/uploads/${propiedad.imagen}`)
    //Eliminar propiedad
    await propiedad.destroy()
    res.redirect('/mis-propiedades')
}
export {
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar
}