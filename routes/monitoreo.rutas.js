const express = require("express");
const {index} = require("./../controllers/monitoreo.controlador");
const router = express.Router();

router.get("/monitoreo", index);

module.exports = router;