const Usuario = require("./../models/usuario.modelo");
const Tipo_usuario = require("./../models/tipousuario.modelo");
//LISTAR
let index = (req, res) => {
    Usuario.find({})
    // .populate("TipoUsuario")
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
//Controla si ya existe
//Controla que la contraseña sea mayor de 5 dígitos
let guardar = (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        usuario: body.usuario,
        email: body.email,
        password: body.password,
        tipo_usuario: body.tipo_usuario,
        date: new Date().toString()
    });

    // console.log("body.usuario:________ ");
    // console.log(body.usuario);
     Usuario.findOne({ usuario: body.usuario }, (err, usuarioDB)=>{
        if ( usuarioDB ){
            // console.log("El usuario "+usuarioDB.usuario+" ya existe");
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'El nombre de usuario '+usuarioDB.usuario+' ya existe.'
                }
            })
            // console.log("El usuario "+usuarioDB.usuario+" ya existe");
        }
        else{
            if(body.password.length < 5 )
            return res.status(500).json({
                ok: false,
                err:{
                    message: 'La contraseña debe tener almenos 5 dígitos'
                }
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
    })
    
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
    console.log("id: ");
    console.log(id);
    Usuario.findByIdAndDelete(id, (err, usuario_eliminado) => {
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

//LOGIN
let login = (req, res) => {
    let body = req.body;
    Usuario.findOne({ usuario: body.usuario }, (err, usuarioDB)=>{
        // console.log("body.usuario");
        // console.log(body.usuario);
        // console.log("usuarioDB.usuario");
        // console.log(usuarioDB.usuario);
        if (err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if ( !usuarioDB ){
            return res.status(400).json({
                ok: false,
                err:{
                    message: '(Usuario) o contraseña incorrectos'
                }
            })
        }

        
        if ( body.password !== usuarioDB.password ){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Usuario o (contraseña) incorrectos'
                }
            })
        }

        //con bcrypt
        // if(!bcrypt.compareSync(body.password, usuarioDB.password)){
        //     return res.status(400).json({
        //         ok: false,
        //         err:{
        //             message: 'Usuario o (contraseña) incorrectos'
        //         }
        //     })
        // }

        res.json({
            // status: 'success',
            ok: true,
            usuario: usuarioDB
        })
    })
}

let listar_tipo_usuario = (req,res)=>{
    Tipo_usuario.find({})
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

            return res.json(data);
    })
}

let find_tipo_usuario_byid = (req, res) => {

    const id = req.params.id;
    // Paciente.find({user: ObjectId(ci)})
    Tipo_usuario.find({ _id: id })
        .exec((err, data) => {
            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });

            return res.json(data);
        })
}

module.exports = {
    guardar,
    modificar,
    eliminar,
    index,
    login,
    listar_tipo_usuario,
    find_tipo_usuario_byid
}