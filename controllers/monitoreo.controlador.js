const Monitoreo = require("./../models/monitoreo.modelo");
//LISTAR
let index = (req, res) => {
    Monitoreo.find({})
    .exec((err, data)=>{
        
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });
           // console.log(data);
            return res.json({data});
    })
}
module.exports = {
    index
}