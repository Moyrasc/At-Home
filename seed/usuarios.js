import bcrypt from 'bcrypt';

const usuarios = [
    {
        nombre: 'Noe',
        apellido: 'Sola',
        email: 'correo@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        nombre: 'Joe',
        apellido: 'Smith',
        email: 'correo1@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    },
    {
        nombre: 'Sam',
        apellido: 'Wood',
        email: 'correo2@correo.com',
        confirmado: 1,
        password: bcrypt.hashSync('password', 10)
    }
]

export default usuarios