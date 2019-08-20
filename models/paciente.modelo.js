const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let PacienteSchema = new Schema({
    cedula: String,
    nombres: String,
    apellidos: String,
    sexo: String,
    fecha_nacimiento: Date,
    edad: Number,
    direccion: String,
    estado_civil: String,
    provincia: String,
    canton: String,
    parroquia: String,
    nivel_estudio: String,
    actv_laboral: String,
    telefono: String,
    movil: String,
    long: Number,
    lat: Number,
    /*user: {  //Relacion con user para login
        // type : Schema.Types.ObjectId,
        type : String,
        ref : "Usuario"
    },*/
});

module.exports = mongoose.model("Paciente", PacienteSchema, "pacientes");