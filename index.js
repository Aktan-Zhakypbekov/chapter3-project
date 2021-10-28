let weekDays = [];
let weekChanceOfRain = [];
let weekHumidity = [];
let weekWindSpeed = [];
let weekTemp = [];
let todayInfo = [];
let url = 'http://api.openweathermap.org/data/2.5/weather?q=';
let key = '&APPID=d2afd80470d21af0db4b6344884784ed&units=metric';
let city = '';

let cityDom = document.querySelector('.city__text');
let weatherDom = document.querySelector('.weather__text');
let tempDom = document.querySelector('.temp__text');
let weatherDescrDom = document.querySelector('.weather-descr__text');
let sunriseDom = document.querySelector('.sunrise__data__content');
let sunsetDom = document.querySelector('.sunset__data__content');
let maxTempDom = document.querySelector('.max-temp__data__content');
let minTempDom = document.querySelector('.min-temp__data__content');
let feelsLikeDom = document.querySelector('.feels-like__data__content');
let humidityDom = document.querySelector('.humidity__data__content');
let chanceOfRainDom = document.querySelector('.chance-of-rain__data__content');
let windSpeedDom = document.querySelector('.wind-speed__data__content');
let precipitationDom = document.querySelector('.precipitation__data__content');
let pressureDom = document.querySelector('.pressure__data__content');
let visibilityDom = document.querySelector('.visibility__data__content');
let uvIndexDom = document.querySelector('.uv-index__data__content');

let weekDaysDom = document.querySelectorAll('.week-day');
let weekChanceOfRainDom = document.querySelectorAll('.week-chance-of-rain');
let weekHumidityDom = document.querySelectorAll('.week-humidity');
let weekWindSpeedDom = document.querySelectorAll('.week-wind-speed');
let weekTempDom = document.querySelectorAll('.week-temp');

let searchForm = document.querySelector(
  '.today-info__searcg-cont__search-form-cont__form'
);
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  city = document.querySelector('.search-field').value;
  let searchURL = url + city + key;
  fetch(searchURL, { mode: 'cors' })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      displayTodayData(response);
    });
});

function displayTodayData(data) {
  cityDom.textContent = response.name;
  weatherDom.textContent = response.weather[0].main;
  tempDom.textContent = response.main.temp;
  weatherDescrDom.textContent = response.weather[0].description;
  sunriseDom.textContent = response.sys.sunrise;
  sunsetDom.textContent = response.sys.sunset;
  maxTempDom.textContent = response.main.temp_max;
  minTempDom.textContent = response.main.temp_min;
  feelsLikeDom.textContent = response.main.feels_like;
  humidityDom.textContent = response.main.humidity;
  //chanceOfRainDom.textContent = response.
  windSpeedDom.textContent = response.wind.speed;
  //precipitationDom.textContent = response.
  pressureDom.textContent = response.main.pressure;
  visibilityDom.textContent = response.visibility;
  console.log(response);
}
