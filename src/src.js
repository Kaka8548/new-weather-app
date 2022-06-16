let city = `Kyiv`;
let apiKey = `e6243f25d4521c7113d909e1adc20730`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCurrentWeather);

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
  let temperature = response.data.main.temp;
  let skyStatus = response.data.weather[0].main;
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
  temp.innerHTML = Math.round(temperature);
  let status = document.querySelector("#status");
  status.innerHTML = skyStatus;
  let hum = document.querySelector("#hum");
  hum.innerHTML = `Humidity: ${humidity}%`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed} km/h`;
}
