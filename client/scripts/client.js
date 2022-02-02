const socket = new WebSocket("ws://192.168.178.130:3000");
const cpu = document.getElementById("cpu");
const gpu = document.getElementById("gpu");
let cpuIndex = 0;
let cpuChart = null;
let gpuIndex = 0;
let gpuChart = null;


const message = Messages.O_RUN;
message.length = 10;

socket.onopen = function(event){
    socket.send(JSON.stringify(message));
}

google.charts.load("current", {
    packages: ["corechart", "line"]
});
google.charts.setOnLoadCallback(startChart);

socket.onmessage = function(message){


    const data = JSON.parse(message.data);
    if (data.type == Messages.T_DATA){
        console.log("changed data");

        let cpuTemp = data.cpu/1000;
        cpuTemp = cpuTemp.toFixed(3);
        let gpuTemp = data.gpu;
        gpuTemp = gpuTemp.substring(5, 9);

        // cpu.innerText = cpuTemp.toString();
        // gpu.innerText = gpuTemp.toString();
    
        // cpuTemp = parseInt(cpuTemp);
        if (cpuChart){
            cpuChart.data.addRow([cpuIndex, parseFloat(cpuTemp)]);
            cpuChart.chart.draw(cpuChart.data, cpuChart.options);
            cpuIndex++;
        }

        // gpuTemp = parseInt(gpuTemp);
        if (gpuChart){
            gpuChart.data.addRow([gpuIndex, parseFloat(gpuTemp)]);
            gpuChart.chart.draw(gpuChart.data, gpuChart.options);
            gpuIndex++;
        }
    }
}

function startChart() {
    // create data object with default value
    let data = google.visualization.arrayToDataTable([
        ["", ""],
        [0, 0]
    ]);
    // create options object with titles, colors, etc.
    let options = {
        title: "CPU temp",
        hAxis: {
            title: "Time"
        },
        vAxis: {
            title: "temp (c)"
        }
    };
    // draw chart on load
    let chart = new google.visualization.LineChart(
        document.getElementById("chart_div1")
    );
    chart.draw(data, options);
    cpuChart = {
        data:data,
       options:options,
        chart:chart
    }


    data = google.visualization.arrayToDataTable([
        ["", ""],
        [0, 0]
    ]);
    // create options object with titles, colors, etc.
    options = {
        title: "GPU temp",
        hAxis: {
            title: "Time"
        },
        vAxis: {
            title: "temp (c)"
        }
    };
    // draw chart on load
    chart = new google.visualization.LineChart(
        document.getElementById("chart_div2")
    );
    chart.draw(data, options);
    gpuChart = {
        data:data,
       options:options,
        chart:chart
    }
}