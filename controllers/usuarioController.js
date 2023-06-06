import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Inicia sesión'
    })
}
const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
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
            csrfToken: req.csrfToken(),
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
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario ya existe' }],
            usuario: {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email
            }
        })
    }
    //Almacenar Usuario
    const usuario = await Usuario.create({
        nombre,
        apellido,
        email,
        password,
        token: generarId()
    })
    //Enviar correo de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        token: usuario.token
    })
    //Mensaje de confirmación
    res.render('template/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email  de confirmación, presione el enlace y confirme su cuenta'
    })
}
// Función comprobación cuenta
const confirmarCuenta = async (req, res) => {
    const { token } = req.params;
    //Verificar si el token es válido
    const usuario = await Usuario.findOne({ where: { token } })
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error confirmación de cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, verifica tu email e inténtalo de nuevo',
            error: true
        })
    }
    //Confirmar cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save()

    return res.render('auth/confirmar-cuenta', {
        pagina: ' Cuenta confirmada',
        mensaje: 'Tu cuenta ha sido confirmada y creada con éxito'
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
    confirmarCuenta,
    formularioRecuperarPassword
}