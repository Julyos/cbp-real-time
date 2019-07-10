const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    usuario: String,
    email: String,
    password: String,
    date: Date
});

module.exports = mongoose.model("Usuario", UsuarioSchema, "users");