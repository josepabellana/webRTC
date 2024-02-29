
const fs = require('fs')
const express = require('express');
const https = require('https')
const app = express();
const socketio = require('socket.io')
app.use(express.static(__dirname))
// use mkcert create-cert to create the key and certificate use for the server
const key = fs.readFileSync('cert.key')
const cert = fs.readFileSync('cert.crt')
const expressServer = https.createServer({key, cert}, app);
const io = socketio(expressServer);

io.on('connection', socket => {
    console.log('someone has connected', socket.id)
})
expressServer.listen(8181)

