document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const replayButton = document.getElementById('replayButton');
 
    const levelDisplay = document.getElementById('level');
    const scoreDisplay = document.getElementById('score');
    const buttons = document.querySelectorAll('.gameButton');
    const timerBar = document.getElementById('timerBar');
    const colors = ['red', 'blue', 'green', 'yellow'];
    const sounds = {
        red: new Audio('sounds/red.mp3'),
        blue: new Audio('sounds/blue.mp3'),
        green: new Audio('sounds/green.mp3'),
        yellow: new Audio('sounds/yellow.mp3')
    };

    let sequence = [];
    let userSequence = [];
    let level = 0;
    let score = 0;
    let isPlayerTurn = false;
    let timer;

    startButton.addEventListener('click', startGame);
    replayButton.addEventListener('click', startGame);

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    function startGame() {
        resetGame();
        nextLevel();
    }

    function resetGame() {
        sequence = [];
        userSequence = [];
        level = 0;
        score = 0;
        isPlayerTurn = false;
        clearInterval(timer);
        updateDisplay();
        timerBar.style.width = '100%';
    }

    function nextLevel() {
        level++;
        score += 10;
        updateDisplay();
        addToSequence();
        playSequence();
    }

    function updateDisplay() {
        levelDisplay.textContent = `Level: ${level}`;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function addToSequence() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(randomColor);
    }

    function playSequence() {
        let index = 0;
        isPlayerTurn = false;
        const interval = setInterval(() => {
            if (index < sequence.length) {
                playButton(sequence[index]);
                index++;
            } else {
                clearInterval(interval);
                isPlayerTurn = true;
                userSequence = [];
                startTimer();
            }
        }, 1000);
    }

    function playButton(color) {
        const button = document.getElementById(`${color}Button`);
        button.classList.add('active');
        sounds[color].play();
        setTimeout(() => {
            button.classList.remove('active');
        }, 500);
    }

    function handleButtonClick(event) {
        if (!isPlayerTurn) return;
        const color = event.target.classList[1];
        userSequence.push(color);
        playButton(color);
        checkSequence();
    }

    function checkSequence() {
        for (let i = 0; i < userSequence.length; i++) {
            if (userSequence[i] !== sequence[i]) {
                gameOver();
                return;
            }
        }
        if (userSequence.length === sequence.length) {
            clearInterval(timer);
            setTimeout(nextLevel, 1000);
        }
    }

    function startTimer() {
        let timeLeft = 10; // 10 seconds to respond
        timerBar.style.width = '100%';
        timer = setInterval(() => {
            timeLeft -= 0.1;
            timerBar.style.width = `${timeLeft * 10}%`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameOver();
            }
        }, 100);
    }

    function gameOver() {
        alert(`Game Over! Your score is ${score}`);
        resetGame();
    }

    function showSettings() {
        // Implement settings functionality here
    }
});
