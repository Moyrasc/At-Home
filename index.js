//const express = require('express')

import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js';

//Crear app
const app = express()

//Conexión a la base de datos
try {
    await db.authenticate();
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
app.use('/auth', usuarioRoutes)

//Definir puerto y arrancar proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port}`)
});