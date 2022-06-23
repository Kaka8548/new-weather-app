function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  if (inputCity.value) {
    let city = inputCity.value;
    let apiKey = `e6243f25d4521c7113d909e1adc20730`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayCurrentWeather);
  } else {
    let displayedWeather = document.querySelector("#displayed-weather");
    displayedWeather.classList.add("small");
    displayedWeather.innerHTML = `<p style="margin-bottom:0">You haven't typed anything yet 🙈</p><img src="./img/cat.png" alt="cat" style="width:45%"/>`;
  }
}

function showForecast(coords) {
  let apiKey = `e6243f25d4521c7113d909e1adc20730`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function findDay(code) {
  let forecastDay = new Date(code * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = days[forecastDay.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let dailyForecast = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 6) {
      dailyForecast =
        dailyForecast +
        `<div class="col-2">
            ${findDay(day.dt)}
            <img
              src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"
              alt="sunny"
            />
            <span class="forecast-max-temp">${Math.round(day.temp.max)}°</span>
            <span class="forecast-min-temp">${Math.round(day.temp.min)}°</span>
          </div>`;
    }
  });

  dailyForecast = dailyForecast + `</div>`;
  forecastElement.innerHTML = dailyForecast;
}

function displayCurrentWeather(response) {
  weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(response.data.dt * 1000);
  let day = weekDays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  celsiusTemperature = response.data.main.temp;
  let skyStatus = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let city = response.data.name;
  let iconId = response.data.weather[0].icon;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = city;
  currentCity.classList.remove("small");
  let currentData = document.querySelector("#currently-data");
  currentData.innerHTML = `${day}, ${hours}:${minutes}`;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemperature);
  let status = document.querySelector("#status");
  status.innerHTML = skyStatus;
  let hum = document.querySelector("#hum");
  hum.innerHTML = `Humidity: ${humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconId}@2x.png`
  );

  let c = document.querySelector("#cels-temp");
  let f = document.querySelector("#fah-temp");

  c.classList.add("active");
  f.classList.remove("active");

  showForecast(response.data.coord);
}

function showFahTemp(event) {
  event.preventDefault();
  let fahTemp = document.querySelector("#temp");
  fahTemp.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
  f.classList.add("active");
  c.classList.remove("active");
}

function showCelsTemp(event) {
  event.preventDefault();
  let CelsTemp = document.querySelector("#temp");
  CelsTemp.innerHTML = Math.round(celsiusTemperature);
  c.classList.add("active");
  f.classList.remove("active");
}

function search(city) {
  let apiKey = `e6243f25d4521c7113d909e1adc20730`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

let f = document.querySelector("#fah-temp");
let c = document.querySelector("#cels-temp");
f.addEventListener("click", showFahTemp);
c.addEventListener("click", showCelsTemp);

let celsiusTemperature = null;

let inputForm = document.querySelector("#input-form");
inputForm.addEventListener("submit", handleSubmit);

search("Kyiv");
