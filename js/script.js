const ADD_ZERO_TO_TIME = 10;
const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

let currentDate, currentHours, currentMinutes, currentSeconds, currentTime;

const container = document.getElementById('container');

setInterval(() => {
    currentDate = new Date();
    currentHours = currentDate.getHours();
    currentMinutes = currentDate.getMinutes();
    currentSeconds = currentDate.getSeconds();
    if (currentSeconds < ADD_ZERO_TO_TIME) {
        currentSeconds = '0' + currentSeconds;
    }
    if (currentMinutes < ADD_ZERO_TO_TIME) {
        currentMinutes = '0' + currentMinutes;
    }
    if (currentHours < ADD_ZERO_TO_TIME) {
        currentHours = '0' + currentHours;
    }
    currentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`;

    const div = document.createElement('div');
    div.setAttribute('id', 'current-time');
    div.textContent = `${currentTime}`;
    if (container.firstElementChild) {
        container.firstElementChild.replaceWith(div)
    } else {
        container.append(div);
    }  
}, MILLISECONDS_IN_SECOND);

setTimeout(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'timer');
    const label = document.createElement('label');
    label.textContent = 'Set timer to:   ';
    const input = document.createElement('input');
    // input.setAttribute('type', 'numbers');
    input.placeholder = 'Minutes'
    const startButton = document.createElement('button');
    startButton.setAttribute('onclick', 'setTimer()');
    startButton.textContent = 'Start'
    const stopButton = document.createElement('button');
    stopButton.setAttribute('onclick', 'stopTimer()');
    stopButton.textContent = 'Stop'
    div.append(label, input, startButton, stopButton);
    container.append(div);
}, MILLISECONDS_IN_SECOND);

function setTimer () {
    let interval = document.querySelector('input').value;
    const miliseconds = interval * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
    timer(miliseconds);
    setTimeout(() => {
        let audio = new Audio();
        audio.src = './Assets/ring.mp3';
        audio.autoplay = true;
    }, miliseconds);
}

function timer (miliseconds) {
    let timeLeft = miliseconds;
    let secondsLeft, minutesLeft, leftTime;
    const div = document.createElement('div');
    container.append(div);
    const interval = setInterval(() => {
        secondsLeft = timeLeft / MILLISECONDS_IN_SECOND % SECONDS_IN_MINUTE;
        minutesLeft = (timeLeft / MILLISECONDS_IN_SECOND - secondsLeft) / SECONDS_IN_MINUTE;
        if (secondsLeft < ADD_ZERO_TO_TIME) {
            secondsLeft = '0' + secondsLeft;
        }
        if (minutesLeft < ADD_ZERO_TO_TIME) {
            minutesLeft = '0' + minutesLeft;
        }
        leftTime = `${minutesLeft}:${secondsLeft}`;
        document.querySelector('input').value = leftTime;
        // const div = document.createElement('div');
        // div.setAttribute('id', 'left-time');
        // div.textContent = `${leftTime}`;
        // if (container.lastElementChild) {
        //     container.lastElementChild.replaceWith(div)
        // } else {
        //     container.append(div);
        // }  
        timeLeft -= MILLISECONDS_IN_SECOND;
        if (timeLeft < 0) {
            clearInterval(interval);
        }
    }, MILLISECONDS_IN_SECOND);

}

// function stopTimer () {

// }
