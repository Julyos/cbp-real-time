const express = require("express");

var app = express();

app.use("/api", require("./usuario.rutas")); //pasamos namespace inicial
app.use("/api", require("./monitoreo.rutas"));
app.use("/api", require("./paciente.rutas"));
module.exports = app;