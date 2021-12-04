document.getElementById('baloon').addEventListener('contextmenu' , showMenu);
window.addEventListener('click', hideMenu);
document.addEventListener('keydown', checkKey);

function showMenu(event) {
    if (event.ctrlKey) {
        event.preventDefault();

        let contextMenu = document.querySelector('.context-menu');
        let baloon = document.getElementById('baloon');

        contextMenu.innerText = `Height: ${baloon.offsetHeight}px, Width: ${baloon.offsetWidth}px`;
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.style.display = 'block';
        contextMenu.style.fontSize = '15px';
    }
}

function hideMenu() {
    document.querySelector('.context-menu').style.display = 'none'
}

function checkBaloonSize(baloonFontSize) {
    let baloon = document.getElementById('baloon');

    if (baloonFontSize > 100) {
        baloon.innerHTML = '💥';
        document.removeEventListener('keydown', checkKey);
        baloon.removeEventListener('contextmenu' , baloonClick);
    } 
    else if (baloonFontSize < 10) {
        baloonFontSize = 10;
    }
    return baloonFontSize + 'px';
}

function pumpBaloon() {
    let baloon = document.getElementById('baloon');
    let baloonFontSize = parseFloat(window.getComputedStyle(baloon).getPropertyValue('font-size'));
    baloonFontSize *= 1.1;
    baloon.style.fontSize = checkBaloonSize(baloonFontSize);
}

function depumpBaloon() {
    let baloon = document.getElementById('baloon');
    let baloonFontSize = parseFloat(window.getComputedStyle(baloon).getPropertyValue('font-size'));
    baloonFontSize *= 0.9;
    baloon.style.fontSize = checkBaloonSize(baloonFontSize);
}

function checkKey(event) {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        depumpBaloon();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        pumpBaloon();
    }
}