require("./config/variables");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('./config/database');
const mqtt_config = require('./config/mqtt');
const Monitoreo = require('./models/monitoreo.modelo');

const app = express(); //crear la aplicación inicial

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //Da control a cualquier IP que quiera hacer una pretición a mi API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //Añade métodos
    res.header("Access-Control-Allow-Headers", "Origin, X-Requesed-With, Content-Type, Accept, Authorization"); //Manda parámetros en el header
    next();
});
//parseamos
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ //parsea la información
    extended: true
}))
// parse application/json      //Permite configurar el tamaño de los datos que llegan 
app.use(bodyParser.json())

app.get('/', function (req, res) { //se muestra cuando entran a la raiz de mi API
    res.send('Bienvenido a mi primera API');
});
//usamos rutas
app.use(require("./routes/index.rutas")); //configuracion para que use todas las rutas de index 


//conectamos
var promise = mongoose.connect(config.database, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
    var dbName = config.database.split('/');
    var n = dbName.length;
    console.log('Conectado a base de datos: ' + dbName[n - 1]);
});
mongoose.connection.on('error', (error) => {
    console.log('Database Error: ' + error)
});
/** mongoose.connect("mongodb://localhost/blood_pressure_rt",(err) => {  //línea de conexión
    if (err){
        console.log("Eror de conexion: "+err);
    }
    console.log("Se conectó");
})*/
//escuchamos
app.listen(process.env.PORT, (err) => { //se le pone a correr por el puerto configurado, 
    console.log("Se conectó por el puerto: " + process.env.PORT); //controlamos el error
})

//mqtt
var mqtt = require('mqtt');
var options = {
    port: mqtt_config.port,
    host: mqtt_config.host,
    clientId: mqtt_config.clientId,
    username: mqtt_config.username,
    password: mqtt_config.password,
    keepalive: mqtt_config.keepalive,
    reconnectPeriod: mqtt_config.reconnectPeriod,
    protocolId: mqtt_config.protocolId,
    protocolVersion: mqtt_config.protocolVersion,
    clean: mqtt_config.clean,
    encoding: mqtt_config.encodingy
};
var client = mqtt.connect(mqtt_config.host, options);
client.on('connect', function () { // When connected
    console.log('connected');
    // Descargar datos
   // client.subscribe('test', function () {
        // when a message arrives, do something with it
        client.publish('test', 'sistolica;diastolica', function () {
            console.log("Message is published");
        });
      //  client.on('message', function (topic, message, packet) {
        //    console.log("Received '" + message + "' on '" + topic + "'");
            
            app.post('/publish', function (req, res) {
                return res.json('publish');
                var msg = JSON.stringify({
                    date: new Date().toString(),
                    msg: req.body.msg
                });
                client.publish(topic, msg, function () {
                    res.writeHead(204, {
                        'Connection': 'keep-alive'
                    });
                    console.log(topic);
                    res.end();
                });
            })
            app.get('/stream', function(req, res) {
                return res.json('stream');
                console.log(res);
                res.writeHead(200, {
                  'Content-Type': 'text/event-stream',
                  'Cache-Control': 'no-cache',
                  'Connection': 'keep-alive'
                });
                res.write('\n');
            
                // Timeout timer, send a comment line every 20 sec
                var timer = setInterval(function() {
                  res.write('event: ping' + '\n\n');
                }, 20000);
            
                client.subscribe(topic, function() {
                  client.on('message', function(topic, msg, pkt) {
                    //res.write("New message\n");
                    console.log("Received '" + msg + "' on '" + topic + "'");
                    var json = JSON.parse(msg);
                    res.write("data: " + json.date + ": " + json.msg + "\n\n");
                  });
                });

            });

            //var json = JSON.parse('{"msg":'+'"'+message+'"'+'}');
            // var msg = message.toString(); //convertimos a string el mensaje que nos llega
            // var arrayDeCadenas = msg.split(";"); //separamos caracteres cuando encuentre una "," --> lo guardamos en un array de caracteres
            // var sist = parseFloat(arrayDeCadenas[0]); //el array guarda el primer valor en la posicion 0, lo almaseno en una nueva variable
            // var dias = parseFloat(arrayDeCadenas[1]); //el array guarda el segundo valor en la posicion 1, lo almaceno en una nueva variable

      //  });

   // });

});
//CODIGO PARA PUBLICAR 10 DATOS EN UN INTERVALO DE TIEMPO DE 3s
// var contador = 5;
// var sistolica = 0;
// var diastolica = 0;

// function restar() {
//     sistolica = sistolica + 120;
//     diastolica = diastolica + 150;
//     // client.publish('test', 'sistolica: '+sistolica+', '+'diastolica: '+diastolica, function() {
//     client.publish('test', sistolica + ';' + diastolica, function () {
//         console.log("Message is published");
//     });
//     contador = contador - 1;
//     //console.log(contador);
//     if (contador == 0) {
//         acabarCuentaAtras();
//     }
// }

// function acabarCuentaAtras() {
//     clearInterval(temporizador); // Paramos la ejecución del método, indicando la variable creada al final
//     console.log("Fin del tiempo, ha llegado a cero");
//     client.end(); // Cierra conexión y deja de pasar datos a mqtt console
//     //console.log(client.end());
// }
// var temporizador = setInterval(function () {
//     restar()
// }, 1000); // 10000ms = 10s    5000 = 5s