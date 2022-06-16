let city = `Kyiv`;
let apiKey = `e6243f25d4521c7113d909e1adc20730`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCurrentWeather);

let f = document.querySelector("#fah-temp");
let c = document.querySelector("#cels-temp");
f.addEventListener("click", showFahTemp);
c.addEventListener("click", showCelsTemp);

let celsiusTemperature = null;

function showCurrentWeather(response) {
  console.log(response.data);
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

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
