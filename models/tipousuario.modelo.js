const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let TipoUsuarioSchema = new Schema({
    tipo_usuario: String,
    estado: String
});

module.exports = mongoose.model("TipoUsuario", TipoUsuarioSchema, "tipo_usuario");