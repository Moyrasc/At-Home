import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { nombre, apellido, email, token } = datos

    //Envio de email confirmación
    await transport.sendMail({
        from: 'AtHome.com',
        to: email,
        subject: 'Confirmación de cuenta At Home.com',
        text: 'Verifica tu cuenta',
        html: `<p>Hola ${nombre + '' + apellido}, bienvenid@ a AtHome.com</p>
            <p>Para poder acceder a tu cuenta debes hacer click en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a></p>  
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
    })

}
const olvidePassword = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { nombre, apellido, email, token } = datos

    //Envio de email recuperación
    await transport.sendMail({
        from: 'AtHome.com',
        to: email,
        subject: 'Recuperación password de At Home.com',
        text: 'Olvido su contraseña ',
        html: `<p>Hola ${nombre + '' + apellido}, has solicitado restablecer tu contraseña</p>
            <p> Sigue el siguiente enlace para poder crear un password nuevo:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recuperar-password/:token/${token}">Reestablecer Password</a></p>  
            <p>Si tu no solicitaste el cambio de password , puedes ignorar el mensaje</p>`
    })

}
export {
    emailRegistro,
    olvidePassword
}