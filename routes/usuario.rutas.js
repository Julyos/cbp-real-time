const express = require("express");
const {index, guardar, modificar, eliminar, login,listar_tipo_usuario,find_tipo_usuario_byid} = require("./../controllers/usuario.controlador");
const router = express.Router();

router.get("/usuario", index);
router.get("/usuario/tipousuario", listar_tipo_usuario);                //TIPO_USUARIO
router.get("/usuario/tipousuario/byid/:id", find_tipo_usuario_byid);    //TIPO_USUARIO
router.post("/usuario/login", login);
router.post("/usuario/signup", guardar);
router.put("/usuario/:id", modificar);
router.delete("/usuario/:id", eliminar);

module.exports = router;