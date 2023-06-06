import express from "express";
import { formularioLogin, formularioRegistro, formularioRecuperarPassword, registrar, confirmarCuenta } from "../controllers/usuarioController.js";


const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

//confirmación de usuario creado
router.get('/confirmar/:token', confirmarCuenta)

router.get('/recuperar-password', formularioRecuperarPassword)



export default router;