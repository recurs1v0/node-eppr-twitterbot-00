// EPPR Twitter Bot Básico
// Escuela de Programación y Pensamiento Recursivo
// eppr.link
// Autor: @lxps 2020
var express = require('express');
var app = express();

// Antes de iniciar recuerda:
// 1) Iniciar un nuevo proyecto de Node con el comando:
// sudo npm init
// 2) Instalar los módulos express & ejs con el comando:
// sudo npm install --save express ejs socket.io twit
// 3) Crear una cuenta de Twitter y solicitar acceso de desarrollador en:
// https://developer.twitter.com
// Una vez que tengamos acceso, obtener 4 claves de conexión a la API.

// Cargamos las llaves secretas de Twitter
var secret = require('./secretKeys.js');
// Carga modulo de Node TWIT
var twit = require('twit');

app.set('view engine', 'ejs')
app.use(express.static('public'))
server = app.listen(3000, function () {
    console.log('Node app corriendo en el puerto 3000!');
    console.log('Para iniciar visita: http://10.55.0.1:3000');
});

// Código para conectarse con Twitter
const io = require("socket.io")(server)
io.on('connection', (socket) => {
    console.log('Usuario Conectado a Navegador')
})
// Iniciar el modulo de TWIT con claves secretas
var Twitter = new twit(secret);
var tags = '#eppr'
// Buscar nuevos Tweets con el Hashtag {tags}
const stream = Twitter.stream('statuses/filter', { track: tags });
// Escuchar Tweets Nuevos (STREAM)
stream.on('tweet', tweet => {
    io.emit('tweet', tweet)
    console.log('Nuevo Tweet : ' + tweet.created_at + ' por @' + tweet.user.screen_name)
});

app.get('/', function (req, res) {
    res.render('index')
});