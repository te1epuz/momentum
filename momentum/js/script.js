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

const lang_span = document.querySelector('.language');
const photoSource_span = document.querySelector('.photoSource');
const unsplashApi = 'It8bvh6_grp0Wrv-jf-vTUaq8nvzLpYu7lKgVdSZzDc';
const flickrApi = '8ba8a60325cbf22fe03fc4729a0c872d';
const photoTheme_block = document.querySelector('.photoThemeInput');
const photoTheme_span = document.querySelector('.photoTheme');
const options = document.querySelector('.options')
const options_bg = document.querySelector('.options_bg')
const button_options = document.querySelector('.button_options');
const button_options_close = document.querySelector('.button_options_close');

const todo = document.querySelector('.todo-wrapper');
const todo_input = document.querySelector('#input_todo')
const todo_filters = document.querySelectorAll('.todo-filters');
const button_todo_clear = document.querySelector('.button_todo-clear');
const todo_list = document.querySelector('.todo-list');


const dictionary = {
  en : {
    night: 'Good night',
    morning : 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    namePlaceholder: '[enter Name]',
    newTaskPlaceholder: '[enter new task]',
    todoEmpty: 'no active tasks',
    buttonTodoClear: 'Clear All',
    windSpeed: 'Wind Speed',
    humidity: 'Humidity',
    locale: 'en-US',
    lang: 'Language',
    photoSource: 'Photo Source',
    photoTheme: 'Photo Theme',
    showElements: 'Show elements',
    showElementsList: ['Audio player','Weather forecast','Time','Current date','Greeting','Quote','ToDo'],
    defaultCity: 'Minsk'    
  },
  ru : {
    night: 'Доброй ночи',
    morning : 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    namePlaceholder: '[введите имя]',
    newTaskPlaceholder: '[введите задачу]',
    todoEmpty: 'нет активных задач',
    buttonTodoClear: 'очистить всё',
    windSpeed: 'Скорость ветра',
    humidity: 'Влажность',
    locale: 'ru-RU',
    lang: 'Язык',
    photoSource: 'Источник фото',
    photoTheme: 'Тема фото',
    showElements: 'Показать блоки',
    showElementsList: ['Аудио плеер','Прогноз погоды','Время','Текущая дата','Приветствие','Цитаты','Список дел'],   
    defaultCity: 'Минск'
  }
}

let showBlocks; 
let todoTaskList = [];
let todoTaskListChecked = [];

let lang;
if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
}
else { lang = navigator.language || navigator.userLanguage; };
if (!(lang in dictionary)){ lang= 'en'} 
document.getElementById(lang).checked = true; 

setLanguage()

let photoSource; 
if (localStorage.getItem('photoSource')) {
  photoSource = localStorage.getItem('photoSource');
}
else { photoSource = 'github'};
document.getElementById(photoSource).checked = true; 


function setLocalStorage() {
  if (name_block.value) {localStorage.setItem('name', name_block.value);}  
  localStorage.setItem('city', city_block.value || dictionary[lang].defaultCity); 
  localStorage.setItem('lang', lang);
  localStorage.setItem('photoSource', photoSource);
  localStorage.setItem('photoTheme', photoTheme_block.value); 
  localStorage.setItem('showBlocks', showBlocks);
  if (todoTaskList) {localStorage.setItem('todoTaskList', todoTaskList);}  
  localStorage.setItem('todoTaskListChecked', todoTaskListChecked);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  
  if(localStorage.getItem('name')) {
    name_block.value = localStorage.getItem('name');
  }
  else { name_block.placeholder = dictionary[lang].namePlaceholder};

  if(localStorage.getItem('city')) {
    city_block.value = localStorage.getItem('city');
  }
  else { city_block.value = dictionary[lang].defaultCity}; 

  if(localStorage.getItem('todoTaskList'))  {
    todoTaskList = localStorage.getItem('todoTaskList').split(',');
  }
  else { };

  if(localStorage.getItem('todoTaskListChecked'))  {
    todoTaskListChecked = localStorage.getItem('todoTaskListChecked').split(',');
  }
  else { };

  
  if(localStorage.getItem('photoSource')) {
    photoSource = localStorage.getItem('photoSource');
  }
  else { };
  
  if(localStorage.getItem('photoTheme')) {
    photoTheme_block.value = localStorage.getItem('photoTheme');
  }
  else { };

  if(localStorage.getItem('showBlocks') !== undefined) {
    showBlocks = localStorage.getItem('showBlocks').split(','); 
  }
  else { showBlocks = ['player', 'weather','time', 'date', 'greeting-container', 'footer', 'todo-wrapper']};

  if(showBlocks[0] !== '') {
    showBlocks.forEach((block) => {      
      document.getElementById("checkbox_" + block).checked = true;   
    });
  }

  document.querySelectorAll("input[name='visibility_checkbox']:not(:checked)").forEach((block) => {
    document.querySelector('.' + block.value).classList.toggle('hidden');    
  });


}
window.addEventListener('load', getLocalStorage)






function setLanguage() { 
  lang = document.querySelector('input[name="language"]:checked').value;
  lang_span.textContent = `${dictionary[lang].lang}: `;
  photoSource_span.textContent = `${dictionary[lang].photoSource}: `;
  photoTheme_span.textContent = `${dictionary[lang].photoTheme}: `;
  document.querySelector('.visibility').textContent = `${dictionary[lang].showElements}: `;
  
  document.querySelectorAll('.visibility_checkbox').forEach((block, index) => {
    block.textContent = dictionary[lang].showElementsList[index]
  })
   
  name_block.placeholder = dictionary[lang].namePlaceholder;
  todo_input.placeholder = dictionary[lang].newTaskPlaceholder;
  button_todo_clear.textContent = dictionary[lang].buttonTodoClear;

  todoRefresh()
  
} 

document.querySelectorAll("input[name='language']").forEach((input) => {
  input.addEventListener('change', function () {
    setLanguage();
    getWeather();
    getQuotes();
  });
});




document.querySelectorAll("input[name='visibility_checkbox']").forEach((input) => {
  input.addEventListener('change', function () {
    document.querySelector('.' + input.value).classList.toggle('hidden')
    showBlocks = Array.from(document.querySelectorAll('input[name=visibility_checkbox]:checked')).map(checkbox => checkbox.value);
  });
});







function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString(dictionary[lang].locale);
  time_block.textContent = currentTime;

  showDate();
  showGreeting();

  setTimeout(showTime, 1000);
}
showTime();



function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString(dictionary[lang].locale, options);
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
  greeting_block.textContent = `${dictionary[lang][getTimeOfDay()]},`;
}





let randomNum;
function getRandomNum() {
  randomNum = Math.floor(Math.random() * 20 + 1).toString().padStart(2, "0");
  return;
}
getRandomNum();

async function setBg() {  
  
  const img = new Image();  
  photoSource = document.querySelector('input[name="photoSource"]:checked').value;
  let theme = photoTheme_block.value || getTimeOfDay(); 

  if (photoSource === 'unsplash') {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${theme}&client_id=${unsplashApi}`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
  } else if (photoSource === 'flickr') {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApi}&tags=${theme}&extras=url_l&format=json&nojsoncallback=1`
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.photos.photo[parseInt(randomNum, 10)].url_l;
  } else {
    img.src = `https://raw.githubusercontent.com/Te1epuz/momentum-images/main/images/${getTimeOfDay()}/${randomNum}.jpg`;
  }

  img.onload = () => {      
    body.style.backgroundImage = `url(${img.src})`;
  };
}
window.addEventListener('load', setBg); 

document.querySelectorAll("input[name='photoSource']").forEach((input) => {
  input.addEventListener('change', setBg);
});

photoTheme_block.addEventListener('change', setBg);





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
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_block.value}&lang=${lang}&appid=${weatherApi}&units=metric`;
    const res = await fetch(url);  
    if (res.ok) {
      weatherError.textContent = ``;
      const data = await res.json();
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = `${data.weather[0].description}`;
      windSpeed.textContent = `${dictionary[lang].windSpeed}: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `${dictionary[lang].humidity}: ${data.main.humidity}%`;
    } 
    else {    
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = ``;
      weatherDescription.textContent = ``;
      windSpeed.textContent = ``;
      humidity.textContent = ``;
      weatherError.textContent = `Ошибка!!! Город '${city_block.value}' не найден!`;
    } 
  } catch (err) {  
    console.log ('errorrr', err)  
  }   
}
window.addEventListener('load', getWeather);
city_block.addEventListener('change', getWeather);





async function getQuotes() {  
  const quotes = './assets/quotes.json'
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteNum = Math.floor(Math.random() * data[lang].length);  
  quote.textContent = data[lang][quoteNum]['text'];
  author.textContent = data[lang][quoteNum]['author'];
}
window.addEventListener('load', getQuotes);
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
  audio.src = playList[playNum].src  
  playAudio();
}
playNextBtn.addEventListener('click', playNext);

function playPrev() {
  playListContainer.childNodes[playNum].classList.remove('item-active');
  playNum--;
  if (playNum < 0) { playNum = 3 };
  isPlay = false;
  audio.src = playList[playNum].src
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
    audio.src = playList[playNum].src
    playAudio();
  }
})




 



const volumeSlider = document.getElementById("soundVolume");
volumeSlider.addEventListener('input', e => {
    audio.volume = e.target.value; 
}, false);

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


button_options.addEventListener('click', () => {
  options_bg.classList.remove('hidden');
  options.classList.remove('hidden');
})

options_bg.addEventListener('click', (value) => {
  if (value.target.className = 'options_bg') {
    options.classList.add('hidden');
    options_bg.classList.add('hidden');
  }   
})

button_options_close.addEventListener('click', () => {  
    options.classList.add('hidden');
    options_bg.classList.add('hidden');   
})


// let todoTaskList = ['1st task', '2nd task', '3rd task']

function todoRefresh() {
  todo_list.innerHTML = ""; 
  if (todoTaskList.length === 0) {
    const li = document.createElement('li');
    li.classList.add('todo-task');
    li.style.opacity = '0.4'
    li.textContent = dictionary[lang].todoEmpty;
    todo_list.append(li);

    document.querySelector('.todo-controls').style.display = 'none';
  }
  else {
    document.querySelector('.todo-controls').style.display = 'flex';
    todoTaskList.forEach((el, index) => {    
      let checked = '';
      let line = '';
      if (todoTaskListChecked[index] === 'checked') {
        checked = 'checked';
        line = 'line-through';
      }
      const li = document.createElement('li');      
      li.classList.add('todo-task');
      li.innerHTML = `<label class="todo-task-label" for="task${index + 1}" id="${index}">
                      <input type="checkbox" name="todo_checkbox" id="task${index + 1}" value="ptask${index + 1}"
                      ${checked}>
                      <p class="ptask${index + 1} ${line}">${el}</p>
                      <img src="./assets/svg/x-white.svg" alt="cross">
                      </label>` 
      todo_list.append(li);
    })
  }

  document.querySelectorAll("input[name='todo_checkbox']").forEach((input) => { 
    input.addEventListener('change', function (event) { 
      
      if (input.checked) { 
        todoTaskListChecked[event.target.parentElement.id] = 'checked'; 
        document.querySelector('.' + input.value).classList.add('line-through');
      }
      else {
        todoTaskListChecked[event.target.parentElement.id] = '';
        document.querySelector('.' + input.value).classList.remove('line-through');
      }
    });
  });


  
}
window.addEventListener('load', todoRefresh); 


function todoAddTask() {
  todoTaskList.push(todo_input.value);
  todo_input.value = '';
  // todo_input.blur(); 
  todoRefresh() 
}

todo_input.addEventListener('change', todoAddTask)

button_todo_clear.addEventListener('click', () => {
  todoTaskList = [];
  todoTaskListChecked = [];
  todoRefresh();
})

todo_list.addEventListener('click', (event) => {
  if (event.target.tagName === "IMG") { 
    todoTaskList.splice(event.target.parentElement.id, 1);
    todoTaskListChecked.splice(event.target.parentElement.id, 1);
    todoRefresh();
  }   
})

