// Date and Time
let currentDate = new Date();
let dateTime = document.querySelector("#date");

let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentDate.getDay()];

dateTime.innerHTML = `${day} ${hour}:${minute}`;
console.log(dateTime);

// Search City

function defaultCity(city) {
  let apiKey = "a466af2425182d19efc750f95387487f";
  let unit = "imperial";
  let apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiCity).then(showWeather);
}

function newCity(event) {
  event.preventDefault();

  let city = document.querySelector("#search-cities").value;
  defaultCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

defaultCity("Lansing");

// Show Weather
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-number").innerHTML = Math.round(
    response.data.main.temp
  );
}

//  Geolocation
function showPosition(position) {
  console.log(position);
  let apiKey = "a466af2425182d19efc750f95387487f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchCurrent = document.querySelector("#search-form");
searchCurrent.addEventListener("submit", getCurrentLocation);
