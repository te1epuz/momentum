const time_block = document.querySelector('.time');
const date_block = document.querySelector('.date');
const greeting_block = document.querySelector('.greeting');
const name_block = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time_block.textContent = currentTime;

  showDate();
  showGreeting();

  setTimeout(showTime, 1000);
}
showTime();



function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  date_block.textContent = currentDate;
}



function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6) { return 'night' }
  else if (hours >= 6 && hours < 12) { return 'morning' }
  else if (hours >= 12 && hours < 18) { return 'afternoon' }
  else if (hours >= 18 && hours < 24) { return 'evening' }
}

function showGreeting() {
  greeting_block.textContent = `Good ${getTimeOfDay()},`;
}


function setLocalStorage() {
  localStorage.setItem('name', name_block.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name_block.value = localStorage.getItem('name');
  }
  else { name_block.placeholder = '[enter Name]'}
}
window.addEventListener('load', getLocalStorage)



let randomNum = '01';
getRandomNum();

function getRandomNum() {
  randomNum = Math.floor(Math.random() * 21).toString().padStart(2, "0");
  return;
}

function setBg() {
  const timeOfDay = getTimeOfDay();

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Te1epuz/momentum-images/main/images/${timeOfDay}/${randomNum}.jpg`
  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  }; 
}
setBg()

function getSlideNext() {
  randomNum = (Number(randomNum) + 1).toString().padStart(2, "0"); 
  if (randomNum === '21') { randomNum = '01'; }
  setBg()
}

function getSlidePrev() {
  randomNum = (Number(randomNum) - 1).toString().padStart(2, "0"); 
  if (randomNum === '00') { randomNum = '20'; }
  setBg()
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev) 