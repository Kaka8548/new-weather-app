function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#input-city");
  if (inputCity.value) {
    let city = inputCity.value;
    let apiKey = `e6243f25d4521c7113d909e1adc20730`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showCurrentWeather);
  } else {
    let currentCity = document.querySelector("#city");
    currentCity.classList.add("small");
    currentCity.innerHTML = `You haven't typed anything yet 🙈`;
  }
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tomorrow", "Tue", "Wed", "Thu"];
  let dayForecast = `<div class="row">`;

  days.forEach(function (day) {
    dayForecast =
      dayForecast +
      `<div class="col-2">
            ${day}
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt="sunny"
            />
            <span class="forecast-max-temp">18°</span>
            <span class="forecast-min-temp">12°</span>
          </div>`;
  });

  dayForecast = dayForecast + `</div>`;
  forecastElement.innerHTML = dayForecast;
}

function showCurrentWeather(response) {
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

  showForecast();
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
  axios.get(apiUrl).then(showCurrentWeather);
}

let f = document.querySelector("#fah-temp");
let c = document.querySelector("#cels-temp");
f.addEventListener("click", showFahTemp);
c.addEventListener("click", showCelsTemp);

let celsiusTemperature = null;

let inputForm = document.querySelector("#input-form");
inputForm.addEventListener("submit", handleSubmit);

search("Kyiv");
