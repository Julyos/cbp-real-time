require("./config/variables");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require('./config/database');

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

app.get('/',function (req, res){   //se muestra cuando entran a la raiz de mi API
    res.send('Bienvenido a mi primera API'); 
});
//usamos rutas
app.use(require("./routes/index.rutas"));   //configuracion para que use todas las rutas de index 
//conectamos
var promise = mongoose.connect(config.database, { useNewUrlParser: true });
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
app.listen(process.env.PORT, (err)=>{                               //se le pone a correr por el puerto configurado, 
    console.log("Se conectó por el puerto: "+ process.env.PORT);    //controlamos el error
})

//mqtt
var mqtt = require('mqtt');
var options = {
    port: 12470,
    host: 'mqtt://postman.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'jlhjeufr',
    password: 'jZtDjBYiKOii',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://postman.cloudmqtt.com', options);
client.on('connect', function() { // When connected
    console.log('connected');
    // Descargar datos
    client.subscribe('test', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });
    
    // publish a message to a topic
    //client.publish('topic1/#', 'my message', function() {
    //    console.log("Message is published");
    //    client.end(); // Close the connection when published
    //});
   
});
////CODIGO PARA PUBLICAR 10 DATOS EN UN INTERVALO DE TIEMPO DE 3s
var contador=10;
var sistolica=0;
var diastolica=0;

function restar(){
    sistolica=sistolica+120;
    diastolica=diastolica+150;
    client.publish('test', 'sistolica: '+sistolica+', '+'diastolica: '+diastolica, function() {
        console.log("Message is published");
    });
     contador=contador-1;
     //console.log(contador);
     if(contador==0){
        acabarCuentaAtras();
    }
}
	
function acabarCuentaAtras(){
    clearInterval(temporizador); // Paramos la ejecución del método, indicando la variable creada al final
    console.log("Fin del tiempo, ha llegado a cero");
   // client.end(); // Cierra conexión y deja de pasar datos a mqtt console
}
var temporizador= setInterval(function(){restar()},3000); // 10000ms = 10s    5000 = 5s