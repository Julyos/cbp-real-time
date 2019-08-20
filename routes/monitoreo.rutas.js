const express = require("express");
const {index, guardar,eliminar} = require("./../controllers/monitoreo.controlador");
const router = express.Router();

router.get("/monitoreo", index);
router.post("/monitoreo", guardar);
router.delete("/monitoreo/:id", eliminar);
module.exports = router;