const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MonitoreoSchema = new Schema({
    results: {
    id_paciente: String,
    mon_presion_sistolica: Number,
    mon_presion_diastolica: Number,
    date: String
    }
});

module.exports = mongoose.model("Moninoteo", MonitoreoSchema, "monitoreo");