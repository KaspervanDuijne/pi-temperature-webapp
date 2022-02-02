const socket = new WebSocket("ws://192.168.178.130:3000");
const cpu = document.getElementById("cpu");
const gpu = document.getElementById("gpu");



const message = Messages.O_RUN;
message.length = 10;
// socket.send(JSON.stringify(message));
socket.onopen = function(event){
    socket.send(JSON.stringify(message));
}
socket.onmessage = function(message){


    const data = JSON.parse(message.data);
    if (data.type == Messages.T_DATA){
        console.log("changed data");

        let cpuTemp = data.cpu/1000;
        cpuTemp = cpuTemp.toFixed(3);
        let gpuTemp = data.gpu;
        gpuTemp = gpuTemp.substring(5, 9);

        cpu.innerText = cpuTemp.toString();
        gpu.innerText = gpuTemp.toString();
    }
    

}