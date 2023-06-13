
const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Inmuebles',
        barra: true
    })

}
//Formulario crear un Inmueble nuevo
const crear = (req, res) => {
    res.render('propiedades/crear', {
        pagina: 'Crear Inmueble',
        barra: true
    })
}

export {
    admin,
    crear
}