let cnt = 0;
document.getElementById("test").addEventListener('click', increment);
document.getElementById("ctrl").addEventListener('click', control);

function control() {
    const button = document.getElementById("test");
    const ctrlButton = document.getElementById("ctrl");
    if (button.disabled) {
        button.disabled = false;
        ctrlButton.innerHTML = "Disable button";
        document.getElementById("test").addEventListener('click', increment);
    }
    else {
        button.disabled = true;
        ctrlButton.innerHTML = "Enable Button"
        document.getElementById("test").removeEventListener('click', increment);
        cnt = 0;
        const i = document.getElementById("cnt");
        i.innerHTML = cnt;
    }
}

function increment() {
    cnt = cnt + 1;
    const i = document.getElementById("cnt");
    i.innerHTML = cnt;
}