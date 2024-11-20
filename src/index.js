function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city!");
  }
}
function getWeather(city) {
  let apiKey = "11e1c3be102e1o7a295b1f381bf4dtf4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
      displayTemperature(response.data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again later.");
    });
}
function displayTemperature(data) {
  if (!data || !data.temperature || !data.condition || !data.wind) {
    alert("Invalid data received from API");
    return;
  }
  let temperature = Math.round(data.temperature.current);
  let city = data.city;
  let country = data.country;
  let description = data.condition.description;
  let humidity = data.temperature.humidity;
  let windSpeed = Math.round(data.wind.speed);
  let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.condition.icon}.png`;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  let temperatureValueElement = document.querySelector(
    ".current-temperature-value"
  );
  temperatureValueElement.innerHTML = temperature;
  let temperatureIconElement = document.querySelector(
    ".current-temperature-icon"
  );
  temperatureIconElement.innerHTML = `<img src="${iconUrl}" alt="${description}" width="50" />`;
  let weatherDetailsElement = document.querySelector(".current-details");
  weatherDetailsElement.innerHTML = ` ${
    description.charAt(0).toUpperCase() + description.slice(1)
  }<br/> Humidity: <strong>${humidity}%</strong> <br/> Wind: <strong>${windSpeed} km/h</strong> `;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
