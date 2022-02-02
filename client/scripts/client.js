const socket = new WebSocket("ws://192.168.178.130:3000");
const cpu = document.getElementById("cpu");
const gpu = document.getElementById("gpu");

socket.onmessage = function(message){


    const data = JSON.parse(message.data);
    if (data.type == Messages.T_DATA){
        console.log("changed data");
        cpu.innerText = "cpu: " + data.cpu + " c";
        gpu.innerText = "gpu: " + (data.gpu)+ " c";
    }

}