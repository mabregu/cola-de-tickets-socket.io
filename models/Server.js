const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/index");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || "localhost";
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.middlewares();
        this.sockets();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static("public"));
    }
    
    sockets() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en http://${this.host}:${this.port}`);
        });
    }
}

module.exports = Server;
