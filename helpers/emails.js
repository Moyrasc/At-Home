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

    //Envio de email
    await transport.sendMail({
        from: 'AtHome.com',
        to: email,
        subject: 'Confirmación de cuenta At Home.com',
        text: 'Verifica tu cuenta',
        html: `<p>Hola ${nombre + '' + apellido}, bienvenid@ a AtHome.com</p>
            <p>Para poder acceder a tu cuenta debes hacer click en el siguiente enlace:
            <a href="">Confirmar Cuenta</a></p>  
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>`
    })

}

export {
    emailRegistro
}