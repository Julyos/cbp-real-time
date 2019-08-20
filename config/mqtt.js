module.exports = {
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
}

