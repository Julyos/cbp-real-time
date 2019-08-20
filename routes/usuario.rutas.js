const express = require("express");
const {index, guardar, modificar, eliminar, login,listar_tipo_usuario} = require("./../controllers/usuario.controlador");
const router = express.Router();

router.get("/usuario", index);
router.get("/usuario/tipousuario", listar_tipo_usuario);
router.post("/usuario/login", login);
router.post("/usuario/signup", guardar);
router.put("/usuario/:id", modificar);
router.delete("/usuario/:id", eliminar);

module.exports = router;