const Usuario = require("./../models/usuario.modelo");
//LISTAR
let index = (req, res) => {
    Usuario.find({})
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

            return res.json(data);
    })
}
//GUARDAR
let guardar = (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        usuario: body.usuario,
        email: body.email,
        password: body.password,
        date: body.date
    });

    usuario.save((err, usuario_nuevo)=>{
        if(err)
        return res.status(500).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            usuario_nuevo
        })
    });
}
//MODIFICAR
let modificar = (req, res) => {
    let body = req.body;
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, {new:true}, (err, usuario_modificado) => {
        if(err)
        return res.status(500).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            usuario_modificado
        })
    });
}

//ELIMINAR
let eliminar = (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndDelete(id, (err, usuario_eliminado) => {
        console.log(err);
        if(err)
        return res.status(500).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            usuario_eliminado
        })
    });
}

module.exports = {
    guardar,
    modificar,
    eliminar,
    index
}