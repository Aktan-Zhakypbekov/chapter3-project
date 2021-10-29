let url = 'http://api.openweathermap.org/data/2.5/weather?q=';
let key = '&APPID=d2afd80470d21af0db4b6344884784ed&units=metric';
let city = '';

let cityDom = document.querySelector('.city__text');
let weatherDom = document.querySelector('.weather__text');
let tempDom = document.querySelector('.temp__text');
let weatherDescrDom = document.querySelector('.weather-descr__text');

let sunriseDom = document.querySelector('.sunrise__data__content');
let sunsetDom = document.querySelector('.sunset__data__content');
let latDom = document.querySelector('.lat__data__content');
let lonDom = document.querySelector('.lon__data__content');

let feelsLikeDom = document.querySelector('.feels-like__data__content');
let avgTempDom = document.querySelector('.avg-temp__data__content');
let maxTempDom = document.querySelector('.max-temp__data__content');
let minTempDom = document.querySelector('.min-temp__data__content');

let humidityDom = document.querySelector('.humidity__data__content');
let pressureDom = document.querySelector('.pressure__data__content');
let visibilityDom = document.querySelector('.visibility__data__content');
let windSpeedDom = document.querySelector('.wind-speed__data__content');

let weekDaysDom = document.querySelectorAll('.week-day');
let weekPressureDom = document.querySelectorAll('.week-pressure');
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
      giveValues(response);
      displayTodayData();
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let weekUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=d2afd80470d21af0db4b6344884784ed&units=metric`;
      fetch(weekUrl, { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          giveWeekValues(response);
          displayWeekData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

function displayWeekData(data) {
  for (let i = 1, j = 0; i < data.daily.length; i++, j++) {
    weekDaysDom[j].textContent = getDate(data.daily[i].dt);
    weekPressureDom[j].textContent = data.daily[i].pressure + 'hPa';
    weekHumidityDom[j].textContent = data.daily[i].humidity + '%';
    weekWindSpeedDom[j].textContent = data.daily[i].wind_speed + 'km/hr';
    weekTempDom[j].textContent = weekValues[j] + '\u00B0';
  }
}

let weekValues = [null, null, null, null, null, null, null];
function giveWeekValues(data) {
  for (let i = 1, j = 0; i < data.daily.length; i++, j++) {
    weekValues[j] = data.daily[i].temp.day;
  }
}

let values = {
  city: null,
  weather: null,
  temp: null,
  weatherDescr: null,
  sunrise: null,
  sunset: null,
  lat: null,
  lon: null,
  feelsLike: null,
  avgTemp: null,
  maxTemp: null,
  minTemp: null,
  humidity: null,
  pressure: null,
  visibility: null,
  windSpeed: null,
};

function giveValues(data) {
  values.city = data.name;
  values.weather = data.weather[0].main;
  values.temp = Math.round(data.main.temp * 100) / 100;
  values.weatherDescr = data.weather[0].description;
  values.sunrise = getTime(data.sys.sunrise);
  values.sunset = getTime(data.sys.sunset);
  values.lat = data.coord.lat;
  values.lon = data.coord.lon;
  values.feelsLike = Math.round(data.main.feels_like * 100) / 100;
  values.avgTemp = Math.round(data.main.temp * 100) / 100;
  values.maxTemp = Math.round(data.main.temp_max * 100) / 100;
  values.minTemp = Math.round(data.main.temp_min * 100) / 100;
  values.humidity = data.main.humidity;
  values.pressure = data.main.pressure;
  values.visibility = data.visibility;
  values.windSpeed = data.wind.speed;
}

function displayTodayData() {
  cityDom.textContent = values.city;
  weatherDom.textContent = values.weather;
  tempDom.textContent = values.temp + '\u00B0';
  weatherDescrDom.textContent = values.weatherDescr;
  sunriseDom.textContent = values.sunrise;
  sunsetDom.textContent = values.sunset;
  latDom.textContent = values.lat + '\u00B0';
  lonDom.textContent = values.lon + '\u00B0';
  feelsLikeDom.textContent = values.feelsLike + '\u00B0';
  avgTempDom.textContent = values.avgTemp + '\u00B0';
  maxTempDom.textContent = values.maxTemp + '\u00B0';
  minTempDom.textContent = values.minTemp + '\u00B0';
  humidityDom.textContent = values.humidity + '%';
  pressureDom.textContent = values.pressure + 'hPa';
  visibilityDom.textContent = values.visibility + 'm';
  windSpeedDom.textContent = values.windSpeed + 'km/hr';
}
function getTime(unix) {
  let time = new Date(unix * 1000).toLocaleTimeString('en-US');
  return time;
}
function getDate(unix) {
  let date = new Date(unix * 1000).toLocaleDateString('en-US');
  return date;
}

let tempInCelcius = true;

let tempConverterButton = document.querySelector('.temp-converter-button');
tempConverterButton.addEventListener('click', (e) => {
  if (tempInCelcius == true) {
    tempConverterButton.textContent = 'Convert to celcius';
    tempInCelcius = false;
  } else {
    tempConverterButton.textContent = 'Convert to fahrenheit';
    tempInCelcius = true;
  }
  convertTemp(tempInCelcius, values);
  displayTodayData();
  for (let i = 0; i < weekTempDom.length; i++) {
    weekTempDom[i].textContent = weekValues[i] + '\u00B0';
  }
});

function convertTemp(unit, values) {
  if (unit) {
    values.temp = Math.round((values.temp * (9 / 5) + 32) * 100) / 100;
    values.feelsLike =
      Math.round((values.feelsLike * (9 / 5) + 32) * 100) / 100;
    values.avgTemp = Math.round((values.avgTemp * (9 / 5) + 32) * 100) / 100;
    values.maxTemp = Math.round((values.maxTemp * (9 / 5) + 32) * 100) / 100;
    values.minTemp = Math.round((values.minTemp * (9 / 5) + 32) * 100) / 100;
    for (let i = 0; i < weekValues.length; i++) {
      weekValues[i] = Math.round((weekValues[i] * (9 / 5) + 32) * 100) / 100;
    }
  } else {
    values.temp = Math.round((values.temp - 32) * (5 / 9) * 100) / 100;
    values.feelsLike =
      Math.round((values.feelsLike - 32) * (5 / 9) * 100) / 100;
    values.avgTemp = Math.round((values.avgTemp - 32) * (5 / 9) * 100) / 100;
    values.maxTemp = Math.round((values.maxTemp - 32) * (5 / 9) * 100) / 100;
    values.minTemp = Math.round((values.minTemp - 32) * (5 / 9) * 100) / 100;
    for (let i = 0; i < weekValues.length; i++) {
      weekValues[i] = Math.round((weekValues[i] - 32) * (5 / 9) * 100) / 100;
    }
  }
}
