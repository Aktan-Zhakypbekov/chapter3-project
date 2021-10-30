let url = 'http://api.openweathermap.org/data/2.5/weather?q=';
let key = '&APPID=d2afd80470d21af0db4b6344884784ed&units=metric';
let city = 'moscow';
let weekValues = [null, null, null, null, null, null, null];
let values = {
  temp: null,
  feelsLike: null,
  avgTemp: null,
  maxTemp: null,
  minTemp: null,
};
let tempInCelcius = true;

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

let searchURL = url + city + key;
fetch(searchURL, { mode: 'cors' })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    giveConvertableTodayValues(response);
    displayTodayData(response);
    let lat = response.coord.lat;
    let lon = response.coord.lon;
    let weekUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=d2afd80470d21af0db4b6344884784ed&units=metric`;
    fetch(weekUrl, { mode: 'cors' })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        giveConvertableWeekValues(response);
        displayWeekData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

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
      giveConvertableTodayValues(response);
      displayTodayData(response);
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let weekUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=d2afd80470d21af0db4b6344884784ed&units=metric`;
      fetch(weekUrl, { mode: 'cors' })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          giveConvertableWeekValues(response);
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

function giveConvertableWeekValues(data) {
  for (let i = 1, j = 0; i < data.daily.length; i++, j++) {
    weekValues[j] = data.daily[i].temp.day;
  }
}
function displayWeekData(data) {
  for (let i = 1, j = 0; i < data.daily.length; i++, j++) {
    weekDaysDom[j].textContent = getDate(data.daily[i].dt);
    weekPressureDom[j].textContent = data.daily[i].pressure + 'hPa';
    weekHumidityDom[j].textContent = data.daily[i].humidity + '%';
    weekWindSpeedDom[j].textContent = data.daily[i].wind_speed + 'km/hr';
    weekTempDom[j].textContent = data.daily[i].temp.day + '\u00B0';
  }
}
function giveConvertableTodayValues(data) {
  values.temp = data.main.temp;
  values.feelsLike = data.main.feels_like;
  values.avgTemp = data.main.temp;
  values.maxTemp = data.main.temp_max;
  values.minTemp = data.main.temp_min;
}
function displayTodayData(data) {
  cityDom.textContent = data.name;
  weatherDom.textContent = data.weather[0].main;
  tempDom.textContent = data.main.temp + '\u00B0';
  weatherDescrDom.textContent = data.weather[0].description;
  sunriseDom.textContent = getTime(data.sys.sunrise);
  sunsetDom.textContent = getTime(data.sys.sunset);
  latDom.textContent = data.coord.lat + '\u00B0';
  lonDom.textContent = data.coord.lon + '\u00B0';
  feelsLikeDom.textContent = data.main.feels_like + '\u00B0';
  avgTempDom.textContent = data.main.temp + '\u00B0';
  maxTempDom.textContent = data.main.temp_max + '\u00B0';
  minTempDom.textContent = data.main.temp_min + '\u00B0';
  humidityDom.textContent = data.main.humidity + '%';
  pressureDom.textContent = data.main.pressure + 'hPa';
  visibilityDom.textContent = data.visibility + 'm';
  windSpeedDom.textContent = data.wind.speed + 'km/hr';
}
function getTime(unix) {
  let time = new Date(unix * 1000).toLocaleTimeString('en-US');
  return time;
}
function getDate(unix) {
  let date = new Date(unix * 1000).toLocaleDateString('en-US');
  return date;
}

let tempConverterButton = document.querySelector('.temp-converter-button');
tempConverterButton.addEventListener('click', (e) => {
  if (tempInCelcius == true) {
    tempConverterButton.textContent = 'Convert to celcius';
    tempInCelcius = false;
  } else {
    tempConverterButton.textContent = 'Convert to fahrenheit';
    tempInCelcius = true;
  }
  convertTemp(tempInCelcius, values, weekValues);
  displayConvertedValues(values, weekValues);
});

function convertTemp(unit, values, weekValues) {
  if (unit) {
    for (let value in values) {
      values[value] = Math.round((values[value] * (9 / 5) + 32) * 100) / 100;
    }
    for (let i = 0; i < weekValues.length; i++) {
      weekValues[i] = Math.round((weekValues[i] * (9 / 5) + 32) * 100) / 100;
    }
  } else {
    for (let value in values) {
      values[value] = Math.round((values[value] - 32) * (5 / 9) * 100) / 100;
    }
    for (let i = 0; i < weekValues.length; i++) {
      weekValues[i] = Math.round((weekValues[i] - 32) * (5 / 9) * 100) / 100;
    }
  }
}
function displayConvertedValues(values, weekValues) {
  tempDom.textContent = values.temp + '\u00B0';
  feelsLikeDom.textContent = values.feelsLike + '\u00B0';
  avgTempDom.textContent = values.avgTemp + '\u00B0';
  maxTempDom.textContent = values.maxTemp + '\u00B0';
  minTempDom.textContent = values.minTemp + '\u00B0';
  for (let i = 0; i < weekTempDom.length; i++) {
    weekTempDom[i].textContent = weekValues[i] + '\u00B0';
  }
}
