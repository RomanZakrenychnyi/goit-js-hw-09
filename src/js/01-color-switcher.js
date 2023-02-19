const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

stopBtn.disabled = true;

let intervalId = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


const handelStartBtn = () => {
  const bodyBtn = startBtn.closest('body');

  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalId = setInterval(() => {
    bodyBtn.style.background = getRandomHexColor()
  }, 750)
}


const handelStopBtn = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;

  clearInterval(intervalId);
}


startBtn.addEventListener('click', handelStartBtn);
stopBtn.addEventListener('click', handelStopBtn)