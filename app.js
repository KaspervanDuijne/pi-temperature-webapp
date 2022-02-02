//@ts-check
const express = require("express");
const http = require("http");
const config = require("./config");
const app = express();
const fs = require("fs");
const spawn = require("child_process").spawn;

app.use(express.static(__dirname + "/client"));
const server = http.createServer(app).listen(config.port, config.ip);

//messages and websockets
const websocket = require("ws");
const messages = require("./client/scripts/messages");
const wss = new websocket.Server({server});

//routers
const router = require("./routes/routes");
app.get("/", router);


wss.on("connection", function connection(ws){	

    function send(){
        let data = messages.O_DATA;

        function getGpuTemp(callback){
            let command = spawn("/opt/vc/bin/vcgencmd", ["measure_temp"]);
            let result = "";
            command.stdout.on("data", function(data){
                result += data.toString();
            })
            command.on("close", function(code){
                return callback(result);
            })
        }
        
        getGpuTemp(function(result){
            const cpuTemp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
            data.cpu = cpuTemp.toString();
            data.gpu = result;
            ws.send(JSON.stringify(data));
            setTimeout(send, 1000);
        })
    }
    send();

	ws.onmessage = function incoming(event){
        const data = JSON.parse(event.toString());
        console.log("here");
	}
	ws.onclose = function (code){
    }
});
module.exports = app;
