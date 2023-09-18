//const express = require('express')

import express from 'express';
import csrf from "csurf";
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadRoutes from './routes/propiedadRoutes.js'
import appRoutes from './routes/appRoutes.js'
import db from './config/db.js';

//Crear app
const app = express()

//Habilitar lectura datos de formulario
app.use(express.urlencoded({ extended: true }))

//Habilitar Cookie Parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({ cookie: true }))

//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexión correcta a la BBDD')
} catch (error) {
    console.log(error)
}

//Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta Pública
app.use(express.static('public'))

//Routing
app.use('/', appRoutes)
app.use('/auth', usuarioRoutes)
app.use('/', propiedadRoutes)

//Definir puerto y arrancar proyecto
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en puerto http://localhost:${port}`)
});