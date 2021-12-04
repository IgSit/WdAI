let cnt = 0;
let halt = false;

document.querySelector(".blue").addEventListener('click', blue);
document.querySelector(".red").addEventListener('click', red);
document.querySelector(".yellow").addEventListener('click', yellow);
document.getElementById("prop").addEventListener('click', prop);
document.getElementById("reset").addEventListener('click', reset);

function blue() {
    const i = document.getElementById("counter");
    cnt = cnt + 1;
    i.innerHTML = cnt;
    alert("Niebieski o wartości 1");
    if (cnt > 30) {
        document.querySelector(".red").removeEventListener('click', red);
    }
    if (cnt > 50) {
        document.querySelector(".yellow").removeEventListener('click', yellow);
    }
}
function red(event) {

    const i = document.getElementById("counter");
    cnt = cnt + 2;
    i.innerHTML = cnt;
    alert("Czerwony o wartości 2");
    if (halt) {
        event.stopPropagation();
    }
    if (cnt > 30) {
        document.querySelector(".red").removeEventListener('click', red);
    }
    if (cnt > 50) {
        document.querySelector(".yellow").removeEventListener('click', yellow);
    }

}
function yellow(event) {
 
    const i = document.getElementById("counter");
    cnt = cnt + 3;
    i.innerHTML = cnt;
    alert("Żółty o wartości 3");
    if (halt) {
        event.stopPropagation();
    }
    if (cnt > 30) {
        document.querySelector(".red").removeEventListener('click', red);
    }
    if (cnt > 50) {
        document.querySelector(".yellow").removeEventListener('click', yellow);
    }

}
function prop() {
    const button = document.getElementById("prop");
    if (halt) {
        halt = false;
        button.innerHTML = "Stop propagation";
    }
    else {
        halt = true;
        button.innerHTML = "Start propagation";
    }
}
function reset() {
    cnt = 0;
    const i = document.getElementById("counter");
    i.innerHTML = cnt;
}