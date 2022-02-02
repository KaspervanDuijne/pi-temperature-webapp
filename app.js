//@ts-check
const express = require("express");
const http = require("http");
const config = require("./config");
const app = express();

app.use(express.static(__dirname + "/client"));
const server = http.createServer(app).listen(config.port, config.ip);

//messages and websocket
const websocket = require("ws");
const messages = require("./client/scripts/messages");
const wss = new websocket.Server({server});

//routers
const router = require("./routes/routes");
app.get("/", router);

let websockets = {};

wss.on("connection", function connection(ws){	

    function send(){
        let data = messages.O_DATA;
        data.cpu = 5;
        data.gpu = "temp: 5";
        ws.send(JSON.stringify(data));
        setTimeout(send, 1000);
    }
    send();

	ws.onmessage = function incoming(event){
	}
	ws.onclose = function (code){
    }
});
module.exports = app;
