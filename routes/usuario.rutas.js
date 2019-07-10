const express = require("express");
const {index, guardar, modificar, eliminar} = require("./../controllers/usuario.controlador");
const router = express.Router();

router.get("/usuario", index);
router.post("/usuario", guardar);
router.put("/usuario/:id", modificar);
router.delete("/usuario/:id", eliminar);

module.exports = router;