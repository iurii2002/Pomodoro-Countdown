const ADD_ZERO_TO_TIME = 10;
const MIL_IN_SEC = 1000;
const SEC_IN_MIN = 60;

const container = document.getElementById('container');

addClock()
addTimerMenu()

function addClock () {
    let currentDate, currentTime;
    const div = document.createElement('div');
    div.setAttribute('id', 'current-time');
    div.textContent = 'Loading...'    
    container.append(div)
    setInterval(() => {
        currentDate = new Date();
        currentTime = currentDate.toLocaleTimeString('it-IT');
        div.textContent = `${currentTime}`;
    }, MIL_IN_SEC);
}

function addTimerMenu () {
    const div = document.createElement('div');
    div.setAttribute('id', 'timer');
    const label = document.createElement('label');
    label.textContent = 'Set timer to:   ';
    const input = document.createElement('input');
    input.placeholder = 'Minutes';
    const startButton = document.createElement('button');
    startButton.setAttribute('onclick', 'startTimer()');
    startButton.textContent = 'Start';
    const stopButton = document.createElement('button');
    stopButton.setAttribute('onclick', 'stopTimer()');
    stopButton.textContent = 'Stop';
    const resetButton = document.createElement('button');
    resetButton.setAttribute('onclick', 'resetTimer()');
    resetButton.textContent = 'Reset';
    div.append(label, input, startButton, stopButton, resetButton);
    container.append(div);
}

function startTimer () {
    let interval = document.querySelector('input').value;
    const secondInterval = interval * SEC_IN_MIN || interval.split(':')[0] * SEC_IN_MIN + +interval.split(':')[1];
    const milisecondsInterval = secondInterval * MIL_IN_SEC;
    timer(milisecondsInterval);
}

function timer (miliseconds) {
    let timeLeft = miliseconds;
    window.timerTickTac = setInterval(() => {
        let secondsLeft = timeLeft / MIL_IN_SEC % SEC_IN_MIN;
        let minutesLeft = (timeLeft / MIL_IN_SEC - secondsLeft) / SEC_IN_MIN;
        if (secondsLeft < ADD_ZERO_TO_TIME) {
            secondsLeft = '0' + secondsLeft;
        }
        if (minutesLeft < ADD_ZERO_TO_TIME) {
            minutesLeft = '0' + minutesLeft;
        }
        let leftTime = `${minutesLeft}:${secondsLeft}`;
        timeLeft -= MIL_IN_SEC;
        document.querySelector('input').value = leftTime;
        if (timeLeft < 0) {
            let audio = new Audio();
            audio.src = './Assets/ring.mp3';
            audio.autoplay = true;
            clearInterval(window.timerTickTac);
        }
    }, MIL_IN_SEC);
}

function stopTimer () {
    clearInterval(window.timerTickTac);
}

function resetTimer () {
    clearInterval(window.timerTickTac);
    document.querySelector('input').value = '';
}
