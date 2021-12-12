document.querySelector('.start').addEventListener('click', start);
let nameInput = document.getElementById('name');
const title = document.querySelector('.title');
const container = document.querySelector('.container');
const play = document.querySelector('.play');
const gameWindow = document.querySelector('.window');
const ScoreDiv = document.querySelector('.gameContainer');
const scores = document.querySelector('.scores');
const nick = document.querySelector('.nick');
let score = 0;

function start(event) {
    event.stopPropagation();
    if (nameInput.value.length == 0) {
        return 0;
    }
    nick.innerHTML = nameInput.value;
    ScoreDiv.style.display = 'block';
    container.style.display = 'none';
    play.style.display = 'none';
    title.style.display = 'none';
    scores.style.display = 'none';
    gameWindow.addEventListener('click', shoot);
    playGame();
}

function shoot(event) {
    if (event.target.classList.contains('zombie')) {
        score += 12;
        event.target.remove();
    }
    else {
        score -= 6;
    }
    setScore();
}

function setScore() {
    document.getElementById('value').innerText = score;
}

function playGame() {
    let lives = 3;
    let minSpeed = 1;
    let maxSpeed = 2.5;
    let maxHeight = 250;
    let minHeight = 100;
    score = 0;
    setScore();

    let runner = setInterval(runGame, 1000);

    function runGame() {
        let zombie = document.createElement('div');
        zombie.classList.add('zombie');
        let speed = Math.floor(minSpeed + Math.random() * (maxSpeed - minSpeed) );
        zombie.style.animationDuration = `${speed}s`;
        let scale = 0.75 + Math.random() * 0.5;
        zombie.style.transform = `scale(${scale})`;
        let height = Math.floor(minHeight + Math.random() * (maxHeight - minHeight) );
        zombie.style.bottom = `${height}px`
        zombie.style.zIndex = `${maxHeight - height}`
        
        zombie.addEventListener('animationend', (e) => {
            if (e.animationName === "zombiee-anim-walk") {
                lives--;
                this.remove;
                if (lives == 0) {
                    clearInterval(runner)
                    document.querySelectorAll('.zombie').forEach(x => x.remove());
                    container.style.display = 'block';
                    play.style.display = 'block';
                    gameWindow.removeEventListener('click', shoot);
                    scores.style.display = 'flex';
                    renderScores();
                }
            }
        })
        gameWindow.appendChild(zombie);
    }
}

async function renderScores() {
    let data = {nick : nick, score : score};
    // poniżej nie działa dodawanie nowego wyniku
    (async () => {
        await fetch('http://localhost:3000/scores', {
          method: 'POST',
          body: JSON.stringify(data),
        });
    });
    let response = await fetch('http://localhost:3000/scores');
    let scores = await response.json();
    scores.sort();
    document.getElementById("scoreTable").innerHTML = addScores(scores);
}

function addScores(scores) {
    let template = "<tr> <td>Nick</td> <td>Score</td> </tr>";
    scores = scores.slice(0, 7);
    scores.forEach(score => {
        template += `
        <tr>
            <td>${score.nick}</td>
            <td>${score.score}</td>
        </tr>
        `
    });
    return template;
}