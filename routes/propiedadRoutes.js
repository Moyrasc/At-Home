import express from "express";
import { body } from "express-validator";
import { admin, crear, guardar } from "../controllers/propiedadController.js";

const router = express.Router()

router.get('/mis-propiedades', admin)
router.get('/propiedades/crear', crear)
router.post('/propiedades/crear',
    body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion es obligatoria').isLength({ max: 255 }).withMessage('La descripción es muy larga'),
    body('categoria').isNumeric().withMessage('Selecciona una categoría'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precio'),
    body('habitaciones').isNumeric().withMessage('Selecciona el número de habitaciones'),
    body('wc').isNumeric().withMessage('Selecciona el número de baños'),
    body('garaje').isNumeric().withMessage('Selecciona el número de plazas de garaje'),
    body('lat').notEmpty().withMessage('Ubica el inmueble en el mapa'),
    guardar)




export default router