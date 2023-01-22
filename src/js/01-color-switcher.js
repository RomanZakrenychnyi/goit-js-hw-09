const refs = {
  start: document.querySelector('[data-start'),
  stop: document.querySelector('[data-stop'),
};

const INTERVAL_DURATION = 1000;
let intervalId = null;
refs.stop.disabled = true;

refs.start.addEventListener('click', onBtnClickStart);
refs.stop.addEventListener('click', onBtnClickStop);


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnClickStart() {
    refs.start.disabled = true;
    refs.stop.disabled = false;

    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor()
        
    }, INTERVAL_DURATION);
}

function onBtnClickStop() {
    refs.stop.disabled = true;
    refs.start.disabled = false;
    clearInterval(intervalId);
};
