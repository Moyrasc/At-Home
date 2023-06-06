import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';

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
    await check('password').isLength({ min: 8, max: 15 }).withMessage('El password debe tener entre 8 y 15 caracteres ').run(req)
    await check('confirmar_password').equals(req.body.password).withMessage('El password no coincide').run(req)

    let resultado = validationResult(req)

    //Verificar resultado vacio
    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email
            }
        })
    }
    // Extraer los datos
    const { nombre, apellido, email, password } = req.body;

    //Verificar que el usuario no este duplicado
    const existeUsuario = await Usuario.findOne({ where: { email } })
    if (existeUsuario) {
        return res.render('auth/registro', {
            pagina: 'Crear cuenta',
            errores: [{ msg: 'El usuario ya existe' }],
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email
            }
        })
    }
    //Almacenar Usuario
    await Usuario.create({
        nombre,
        apellido,
        email,
        password,
        token: generarId()
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
    registrar,
    formularioRecuperarPassword
}