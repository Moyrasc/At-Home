import  express  from "express";
import {inicio, categoria, buscador, notFound} from '../controllers/appController.js'


const router = express.Router()

//Página de Inicio
router.get('/', inicio)
//Categorías
router.get('/categorias/:id', categoria)
//Buscador
router.post('/buscador',buscador)
//Página 404
router.get('/404', notFound)

export default router