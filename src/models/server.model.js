const express = require('express');
var cors = require('cors');

const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        //port
        this.port = process.env.PORT;

        //Server
        this.app = express();
        this.server = require('http').createServer(this.app);

        //IO tiene la informacion de todos los clientes conectados
        this.io = require('socket.io')(this.server);

        //path
        this.paths = {}

        //Middleware
        this.middleware()

        //App Routes
        this.routes();

        //Sockets envents
        this.sockets();
    }

    middleware() {
        //cors
        this.app.use(cors())

        //Directorio Publico
        this.app.use(express.static('src/public'));
    }

    routes() {

    }

    sockets() {
        this.io.on('connection', socketController);

    }

    //Levanta el SV de express o io.
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto: ${this.port}`)
        })
    }
}

module.exports = Server;