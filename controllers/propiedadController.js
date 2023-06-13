
const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis Inmuebles',
        barra: true
    })

}

export {
    admin
}