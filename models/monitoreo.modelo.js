const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MonitoreoSchema = new Schema({
    id_paciente: String,
    mon_presion_sistolica: String,
    mon_presion_diastolica: String,
    date: String
});

module.exports = mongoose.model("Moninoteo", MonitoreoSchema, "monitoreo");