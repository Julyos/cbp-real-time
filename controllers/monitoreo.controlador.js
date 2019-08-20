const Monitoreo = require("./../models/monitoreo.modelo");
const mqtt_config = require('../config/mqtt');
var mqtt = require('mqtt');
const express = require("express");
var router = express.Router();
var url = require('url');


//LISTAR
let index = (req, res) => {
    Monitoreo.find({})
        .exec((err, data) => {

            if (err)
                return res.status(500).json({
                    ok: false,
                    err
                });
            // console.log(data);
            return res.json({
                data
            });
        })
}
//guardar 
var a;
function suma() {
    //console.log(url);
    return 1+1;
    // var mqtt = require('mqtt');
    // var options = {
    //     port: mqtt_config.port,
    //     host: mqtt_config.host,
    //     clientId: mqtt_config.clientId,
    //     username: mqtt_config.username,
    //     password: mqtt_config.password,
    //     keepalive: mqtt_config.keepalive,
    //     reconnectPeriod: mqtt_config.reconnectPeriod,
    //     protocolId: mqtt_config.protocolId,
    //     protocolVersion: mqtt_config.protocolVersion,
    //     clean: mqtt_config.clean,
    //     encoding: mqtt_config.encodingy
    // };
    // var client = mqtt.connect(mqtt_config.host, options);
    // client.on('connect', function () { // When connected
    //     console.log('connected');

    //     client.subscribe('test', function () {
    //         var sistolica = 0;
    //         var diastolica = 0;
    //         sistolica = sistolica + 120;
    //         diastolica = diastolica + 150;
    //         // client.publish('test', 'sistolica: '+sistolica+', '+'diastolica: '+diastolica, function() {
    //         client.publish('test', sistolica + ';' + diastolica, function () {
    //             console.log("Message is published");
    //         });
    //         client.on('message', function (topic, message, packet) {
    //             console.log("Received '" + message + "' on '" + topic + "'");
    //             var msg = message.toString(); //convertimos a string el mensaje que nos llega
    //             var arrayDeCadenas = msg.split(";"); //separamos caracteres cuando encuentre una "," --> lo guardamos en un array de caracteres
    //             var sist = parseFloat(arrayDeCadenas[0]); //el array guarda el primer valor en la posicion 0, lo almaseno en una nueva variable
    //             var dias = parseFloat(arrayDeCadenas[1]); //el array guarda el segundo valor en la posicion 1, lo almaceno en una nueva variable
    //             return sist;
    //         });
    //       //  client.end();

    //     });


    // });
}
//
let guardar = (req, res) => {
    let body = req.body;
    let monitoreo = new Monitoreo({
        id_paciente: body.id_paciente,
        mon_presion_sistolica: body.mon_presion_sistolica,
        mon_presion_diastolica: body.mon_presion_diastolica,
        date: body.date
    });
    monitoreo.save((err, monitoreo_nuevo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            monitoreo_nuevo
        });
    }); //
    // 
}

//ELIMINAR
let eliminar = (req, res) => {
    let id = req.params.id;

    Monitoreo.findByIdAndDelete(id, (err, monitoreo_eliminado) => {
        console.log(err);
        if(err)
        return res.status(500).json({
            ok: false,
            err
        });
        return res.json({
            ok: true,
            monitoreo_eliminado
        })
    });
}

module.exports = {
    index,
    guardar,
    eliminar
}