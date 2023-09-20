import express from "express";
import { formularioLogin, formularioRegistro, formularioRecuperarPassword, registrar, confirmarCuenta, resetearPassword, comprobarToken, nuevoPassword, autenticar, cerrarSesion } from "../controllers/usuarioController.js";


const router = express.Router();

router.get('/login', formularioLogin);
router.post('/login', autenticar);

//Cerrar sesión
router.post('/cerrar-sesion', cerrarSesion)

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

//confirmación de usuario creado
router.get('/confirmar/:token', confirmarCuenta)

router.get('/recuperar-password', formularioRecuperarPassword)

router.post('/recuperar-password', resetearPassword)

//Almacenar nuevo pass

router.get('/recuperar-password/:token', comprobarToken)
router.post('/recuperar-password/:token', nuevoPassword)

export default router;