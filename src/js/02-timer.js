import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('button'),
    timerDays: document.querySelector('[data-days]'),
    timerHours: document.querySelector('[data-hours]'),
    timerMinutes: document.querySelector('[data-minutes]'),
    timerSeconds: document.querySelector('[data-seconds]')
}

refs.btnStart.disabled = true;
let timerId = null;

refs.btnStart.addEventListener('click', onTimerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
      const todaysDate = new Date();

      if (selectedDates[0] - todaysDate > 0) {
        refs.btnStart.disabled = false;
      } else {
          refs.btnStart.disabled = true;
          Notify.failure('Please choose a date in the future', {
              timeout: 1500,
              width: '400px',
          });
      }
    },
};

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

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
}

function onTimerStart() {
    const chosenDate = fp.selectedDates[0]    
    
    timerId = setInterval(() => {
        const startTime = new Date();
        const countdown = chosenDate - startTime;
        refs.btnStart.disabled = true;

        updateTimerFace(convertMs(countdown));
        
        if (countdown < 0) {
            clearInterval(timerId);
        }
    }, 1000)
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerDays.textContent = addLeadingZero(days);
  refs.timerHours.textContent = addLeadingZero(hours);
  refs.timerMinutes.textContent = addLeadingZero(minutes);
  refs.timerSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr("#datetime-picker", options);