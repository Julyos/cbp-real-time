const Paciente = require("./../models/paciente.modelo");
//Listar
let index = (req, res) => {
    Paciente.find({})
        .exec((err, data) => {

            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            // console.log(data);
            return res.json(
                data
            );
        })
}

//Crear paciente
let guardar = (req, res) => {
    let body = req.body;
    let paciente = new Paciente({
        cedula: body.cedula,
        nombres: body.nombres,
        apellidos: body.apellidos,
        sexo: body.sexo,
        fecha_nacimiento: body.fecha_nacimiento,
        edad: body.edad,
        direccion: body.direccion,
        estado_civil: body.estado_civil,
        provincia: body.provincia,
        canton: body.provincia,
        parroquia: body.parroquia,
        nivel_estudio: body.nivel_estudio,
        actv_laboral: body.actv_laboral,
        telefono: body.telefono,
        movil: body.movil,
        long: body.long,
        lat: body.lat
    });

    paciente.save((err, paciente_nuevo) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        return res.json({
            ok: true,
            paciente_nuevo
        })
    });
}



//BUSQUEDA POR CEDULA
let findbyci = (req, res) => {
    const ci = req.params.userCi;
    Paciente.find({ cedula: ci })
        .exec((err, data) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            if (data[0] === undefined) //Si no tiene almenos 1 dato genera el error
                return res.status(404).json({
                ok: false,
                err
            });
            return res.json({
                ok: true,
                data
            });
        })
}

//BUSQUEDA POR USUARIO
let findbyusr = (req, res) => {
    // const ci = new ObjectId();
    // var mongojs = require("mongojs");
    // var ObjectId = mongojs.ObjectId;
    //    var db = mongojs("dbname");
    //
    // var ObjectId = mongojs.ObjectId;
    //db.users.find({"_id": ObjectId(id)}, function(err, user){...}
    //
    const ci = req.params.userId;
    // Paciente.find({user: ObjectId(ci)})
    Paciente.find({ user: ci })
        .exec((err, data) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });

            if (data[0] === undefined) //Si no tiene almenos 1 dato genera el error
                return res.status(500).json({
                ok: false,
                err
            });

            return res.json(data);
        })
}

let modificar = (req, res) => {
    let body = req.body;
    let id = req.params.id;
    Paciente.findByIdAndUpdate(id, body, { new: true }, (err, paciente_modificado) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        return res.json({
            ok: true,
            paciente_modificado
        })
    });
}

module.exports = {
    findbyci,
    findbyusr,
    modificar,
    index,
    guardar
}