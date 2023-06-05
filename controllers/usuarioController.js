
const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Inicia sesión'

    })
}
const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta'
    })
}
const formularioRecuperarPassword = (req, res) => {
    res.render('auth/recuperar-password', {
        pagina: 'Recuperar acceso a tu cuenta'
    })
}
export {
    formularioLogin,
    formularioRegistro,
    formularioRecuperarPassword
}