const ADD_ZERO_TO_TIME = 10;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const container = document.getElementById('container');

addClock()
addTimerMenu()

function addClock () {
    let currentDate, currentHours, currentMinutes, currentSeconds, currentTime;
    const div = document.createElement('div');
    div.setAttribute('id', 'current-time');
    div.textContent = 'Loading...'    
    container.append(div)
    setInterval(() => {
        currentDate = new Date();
        currentTime = currentDate.toLocaleTimeString('it-IT');
        div.textContent = `${currentTime}`;
    }, MILLISECONDS_IN_SECOND);
};

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
};

function startTimer () {
    let interval = document.querySelector('input').value;
    const secondInterval = interval * SECONDS_IN_MINUTE || interval.split(':')[0] * SECONDS_IN_MINUTE + +interval.split(':')[1];
    const milisecondsInterval = secondInterval * MILLISECONDS_IN_SECOND;
    timer(milisecondsInterval);
};

function timer (miliseconds) {
    let timeLeft = miliseconds;
    window.timerTickTac = setInterval(() => {
        secondsLeft = timeLeft / MILLISECONDS_IN_SECOND % SECONDS_IN_MINUTE;
        minutesLeft = (timeLeft / MILLISECONDS_IN_SECOND - secondsLeft) / SECONDS_IN_MINUTE;
        if (secondsLeft < ADD_ZERO_TO_TIME) {
            secondsLeft = '0' + secondsLeft;
        }
        if (minutesLeft < ADD_ZERO_TO_TIME) {
            minutesLeft = '0' + minutesLeft;
        }
        leftTime = `${minutesLeft}:${secondsLeft}`;
        timeLeft -= MILLISECONDS_IN_SECOND;
        document.querySelector('input').value = leftTime;
        if (timeLeft < 0) {
            let audio = new Audio();
            audio.src = './Assets/ring.mp3';
            audio.autoplay = true;
            clearInterval(window.timerTickTac);
        }
    }, MILLISECONDS_IN_SECOND);
};

function stopTimer () {
    clearInterval(window.timerTickTac);
};

function resetTimer () {
    clearInterval(window.timerTickTac);
    document.querySelector('input').value = '';
};
