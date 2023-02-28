import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button');

btnStart.disabled = true;
let timerId = null;

btnStart.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
      const todaysDate = Date.now();

      if (selectedDates[0] - todaysDate > 0) {
        btnStart.disabled = false;
      } else {
          btnStart.disabled = true;
          Notify.failure('Please choose a date in the future', {
              timeout: 1500,
              width: '400px',
          });
      }
  }, 
};


function pad(value) {
  return `${value}`.padStart(2, 0);
};


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};


function onStart() {
    const chosenDate = fp.selectedDates[0]
     

    timerId = setInterval(() => {
        const startTime = Date.now();
        const countdown = chosenDate - startTime;
        btnStart.disabled = true;
        const convertT = convertMs(countdown)

        console.log(convertT);
        updateTimerFace(convertT);

        if (convertT.days === 0 && convertT.hours === 0 && convertT.minutes === 0 && convertT.seconds === 0) {
            clearInterval(timerId);
        }
    }, 1000)
};
// sada
function updateTimerFace({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = pad(days);
  document.querySelector('[data-hours]').textContent = pad(hours);
  document.querySelector('[data-minutes]').textContent = pad(minutes);
  document.querySelector('[data-seconds]').textContent = pad(seconds);
};


const fp = flatpickr("#datetime-picker", options);
