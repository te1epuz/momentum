const time_block = document.querySelector('.time');
const date_block = document.querySelector('.date');
const greeting_block = document.querySelector('.greeting');
const name_block = document.querySelector('.name');



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
  if (hours < 6) { return 'nigth' }
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