let hour=document.querySelector('.hour');
let minute=document.querySelector('.minute');
let second=document.querySelector('.second');

function rotateClock() {
  let time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();

  let hourRotation = (hours % 12) * 30 + (minutes * 0.5);
  let minuteRotation = minutes * 6;
  let secondRotation = seconds * 6;

  hour.style.transform = `rotate(${hourRotation}deg)`;
  hour.style.transformOrigin = 'bottom center';
  minute.style.transform = `rotate(${minuteRotation}deg)`;
  minute.style.transformOrigin = 'bottom center';
  second.style.transform = `rotate(${secondRotation}deg)`;
}
second.style.transformOrigin = 'bottom center';


rotateClock();

setInterval(rotateClock, 1000);
