import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

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
const registrar = async (req, res) => {

    //Validación
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('apellido').notEmpty().withMessage('El apellido es obligatorio').run(req)
    await check('email').isEmail().withMessage('El email no es valido').run(req)
    await check('password').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/).withMessage('El password debe tener al menos 8 caracteres, una minúscula, una mayúscula y un caracte especial').run(req)
    await check('confirmar_password').equals('password').withMessage('El password no coincide')

    let resultado = validationResult(req)
    res.json(resultado.array())


    const usuario = await Usuario.create(req.body)
    res.json(usuario)

}

const formularioRecuperarPassword = (req, res) => {
    res.render('auth/recuperar-password', {
        pagina: 'Recuperar acceso a tu cuenta'
    })
}
export {
    formularioLogin,
    formularioRegistro,
    registrar,
    formularioRecuperarPassword
}