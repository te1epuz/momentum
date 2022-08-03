const time_block = document.querySelector('.time');
const date_block = document.querySelector('.date');
const greeting_block = document.querySelector('.greeting');
const name_block = document.querySelector('.name');
const city_block = document.querySelector('.city');

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const weatherApi = 'f905531b5f7d6dc98c7fbff34a56d97a';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');




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
  localStorage.setItem('city', city_block.value); 
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name_block.value = localStorage.getItem('name');
  }
  else { name_block.placeholder = '[enter Name]'};

  if(localStorage.getItem('city')) {
    city_block.value = localStorage.getItem('city');
  }
  else { city_block.value = 'Minsk'}; 
  // getWeather()
}
window.addEventListener('load', getLocalStorage)


let randomNum;
function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, "0");
  return;
}
getRandomNum();

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




async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_block.value}&lang=ru&appid=${weatherApi}&units=metric`;
  const res = await fetch(url);

  if (res.ok) {
    weatherError.textContent = ``;
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = `${data.weather[0].description}`;
    windSpeed.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
  } 
  else {    
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    windSpeed.textContent = ``;
    humidity.textContent = ``;
    weatherError.textContent = `Ошибка!!! Город '${city_block.value}' не найден!`;
  } 
   
}
window.addEventListener('load', getWeather);
city_block.addEventListener('change', getWeather);





async function getQuotes() {  
  const quotes = 'https://type.fit/api/quotes';
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteNum = Math.floor(Math.random() * data.length);    
  quote.textContent = data[quoteNum]['text'];
  author.textContent = data[quoteNum]['author'];
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);




const play = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const playPrevBtn = document.querySelector('.play-prev');

let isPlay = false;
let playNum = 0;
const audio = new Audio();
import playList from './playlist.js'
audio.src = playList[playNum].src
document.querySelector("#track").textContent = playList[playNum].title;

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    play.classList.add('pause')
    playListContainer.childNodes[playNum].classList.add('item-active');    
    document.querySelector("#track").textContent = playList[playNum].title;
  }
  else {
    audio.pause();
    isPlay = false;
    play.classList.remove('pause')
    playListContainer.childNodes[playNum].classList.remove('item-active');
  }   
}
play.addEventListener('click', playAudio);
audio.addEventListener('ended', playNext);

function playNext() {
  playListContainer.childNodes[playNum].classList.remove('item-active');
  playNum++;
  if (playNum > 3) { playNum = 0 };
  isPlay = false;  
  playAudio();
}
playNextBtn.addEventListener('click', playNext);

function playPrev() {
  playListContainer.childNodes[playNum].classList.remove('item-active');
  playNum--;
  if (playNum < 0) { playNum = 3 };
  isPlay = false;
  playAudio();
}
playPrevBtn.addEventListener('click', playPrev);

const playListContainer = document.querySelector('.play-list')
playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el['title'];
  playListContainer.append(li);
})

playListContainer.addEventListener('click', (event) => {
  
  if (event.target.classList.contains('item-active')) {    
    playAudio();
  }
  else {
    playListContainer.childNodes[playNum].classList.remove('item-active');
    playNum = Array.prototype.indexOf.call(event.target.parentElement.children, event.target);
    isPlay = false;
    playAudio();
  }
})




 



const volumeSlider = document.getElementById("soundVolume");
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
}, false)

setInterval(() => {
  const progressBar = document.querySelector("#progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  document.querySelector("#timer").textContent = getTimeCodeFromNum(audio.currentTime);
  document.querySelector("#duration").textContent = getTimeCodeFromNum(audio.duration);
}, 500);  

const timeline = document.querySelector(".duration-player");
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
}, false);

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

document.querySelector("#muteButton").addEventListener("click", () => {
  const volumeEl = document.querySelector("#muteButton");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.style.opacity = 0.35;
    
  } else {
    volumeEl.style.opacity = 1;
  }
});

