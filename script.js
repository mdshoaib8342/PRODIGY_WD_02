// script.js

let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 1000;
    let ms = Math.floor(diffInMs);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(3, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    document.getElementById("startStopBtn").textContent = "Pause";
    running = true;
}

function pause() {
    clearInterval(timerInterval);
    document.getElementById("startStopBtn").textContent = "Start";
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("laps").innerHTML = "";
    running = false;
}

function lap() {
    if (running) {
        let lapTime = timeToString(elapsedTime);
        let lapElement = document.createElement("div");
        lapElement.textContent = lapTime;
        document.getElementById("laps").appendChild(lapElement);
    }
}

document.getElementById("startStopBtn").addEventListener("click", function() {
    if (running) {
        pause();
    } else {
        start();
    }
});

document.getElementById("resetBtn").addEventListener("click", reset);
document.getElementById("lapBtn").addEventListener("click", lap);
