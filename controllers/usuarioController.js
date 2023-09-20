import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js';
import { generarJWT, generarId } from '../helpers/tokens.js';
import { emailRegistro, olvidePassword } from '../helpers/emails.js';

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: 'Inicia sesión',
        csrfToken: req.csrfToken()
    })
}
const autenticar = async (req, res) => {
    //Validación
    await check('email').isEmail().withMessage('El email no es valido').run(req)
    await check('password').notEmpty().withMessage('El password es obligatorio').run(req)

    let resultado = validationResult(req)

    //Verificar resultado vacio
    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }
    const { email, password } = req.body
    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario no existe' }],
        })
    }
    //Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'Tu cuenta no esta confirmada' }],
        })
    }
    //Comprobar si la contraseña es correcta
    if (!usuario.verificarPassword(password)) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El email y/o password es incorrecto' }],
        })
    }
    //Autenticar al usuario
    const token = generarJWT(usuario.id)
    console.log(token)
    //Almacenar cookies
    return res.cookie('_token', token, {
        httpOnly: true,
        // secure: true,
        // sameSite: true,
    }).redirect('/mis-propiedades')
}
const cerrarSesion = ( req, res ) => {
    return res.clearCookie('_token').status(200).redirect('/auth/login')
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
//Esta función es solo para mostrar la vista de recuperación
const formularioRecuperarPassword = (req, res) => {
    res.render('auth/recuperar-password', {
        pagina: 'Recuperar acceso a tu cuenta',
        csrfToken: req.csrfToken(),
    })
}
const resetearPassword = async (req, res) => {
    //Validación
    await check('email').isEmail().withMessage('El email no es valido').run(req)

    let resultado = validationResult(req)

    //Verificar resultado vacio
    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/recuperar-password', {
            pagina: 'Recuperar acceso a tu cuenta',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }
    //Buscar usuario registrado con ese email
    const { email } = req.body
    const usuario = await Usuario.findOne({ where: { email } })
    if (!usuario) {
        return res.render('auth/recuperar-password', {
            pagina: 'Recuperar acceso a tu cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El email no pertenece a ningún usuario' }],
        })
    }
    //Generar token de recuperación 
    usuario.token = generarId();
    await usuario.save()

    //Enviar email
    olvidePassword({
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        token: usuario.token
    })
    //Renderizar mensaje de envio
    res.render('template/mensaje', {
        pagina: 'Reestablece tu Password',
        mensaje: 'Hemos enviado un email con las instrucciones'
    })
}
const comprobarToken = async (req, res) => {

    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { token } })

    // Usuario no válido
    if (!usuario) {
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Reestablece tu Password',
            mensaje: 'Hubo un error al validar la información, inténtalo de nuevo.',
            error: true
        })
    }
    // Usuario válido (Formulario para modificar password).
    res.render('auth/reset-password', {
        pagina: 'Reestablece Tu Password',
        csrfToken: req.csrfToken()
    })


}
const nuevoPassword = async (req, res) => {

    // Validar nuevo password
    await check('password').isLength({ min: 8, max: 15 }).withMessage('El password debe tener entre 8 y 15 caracteres ').run(req)
    let resultado = validationResult(req)

    //Verificar resultado vacio
    if (!resultado.isEmpty()) {
        //Errores
        return res.render('auth/reset-password', {
            pagina: 'Reestablece Tu Password',
            csrfToken: req.csrfToken(),
            errores: resultado.array()
        })
    }
    const { token } = req.params;
    const { password } = req.body;
    //Identificar usuario
    const usuario = await Usuario.findOne({ where: { token } });
    //Encriptar password
    const salt = await bcrypt.genSalt(10)
    usuario.password = await bcrypt.hash(password, salt)

    usuario.token = null;
    await usuario.save();

    res.render('auth/confirmar-cuenta', {
        pagina: 'Password Reestablecido',
        mensaje: 'El password se ha modificado correctamente'
    })

}
export {
    formularioLogin,
    autenticar,
    cerrarSesion,
    formularioRegistro,
    registrar,
    confirmarCuenta,
    formularioRecuperarPassword,
    resetearPassword,
    comprobarToken,
    nuevoPassword
}