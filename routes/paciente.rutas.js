const express = require("express");
const { findbyci, findbyusr, modificar, index, guardar } = require("./../controllers/paciente.controlador");
const router = express.Router();
//Buscar
router.get("/paciente", index);
router.get("/paciente/byci/:userCi", findbyci);
router.get("/paciente/byusr/:userId", findbyusr);
//Editar
router.put("/paciente/:id", modificar);
//Nuevo
router.post("/paciente", guardar);

module.exports = router;