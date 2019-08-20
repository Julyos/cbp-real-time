const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
    usuario: String,
    email: String,
    password: String,
    tipo_usuario : {  //Relacion con tipo_usuario
        // type : Schema.Types.ObjectId,
        type : String,
        ref : "TipoUsuario"
    },
    date: String
});

module.exports = mongoose.model("Usuario", UsuarioSchema, "users");