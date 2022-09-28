const $cityInput = $("#cityInput");
const currentApi = `api.openweathermap.org/data/2.5/weather?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;
const forecastApi = `api.openweathermap.org/data/2.5/forecast?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;
const $searchBtn = document.getElementById("searchBtn");
const $searchCity = document.getElementById("searchCity");
const $temp = document.getElementById("temp");
const $wind = document.getElementById("wind");
const $humid = document.getElementById("humidity");
const $savedItems = document.getElementById("savedItems");
const storage = [];

function apiCall() {
  const searchInput = document.getElementById("searchInput").value;
  storage.push(searchInput);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=09335e290f36cab7997b39556d93e753`,
    {
      method: "GET", //GET is the default.
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $searchCity.innerHTML = data.name;
      $temp.innerHTML = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2);
      $wind.innerHTML = data.wind.speed;
      $humid.innerHTML = data.main.humidity;
      localStorage.setItem("location", JSON.stringify(storage));
    });

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=tempe&cnt=5&appid=09335e290f36cab7997b39556d93e753",
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//
$searchBtn.addEventListener("click", apiCall);

const saved = JSON.parse(localStorage.getItem("location"));

saved.forEach((location) => {
  const $li = document.createElement("li");
  $li.textContent = location.toUpperCase();
  $li.setAttribute("class", "btn btn-outline-success");
  $li.setAttribute("style", "margin-bottom: 10px; letter-spacing: .2rem;");
  $li.setAttribute("type", "button");
  $li.setAttribute("value", location);
  $savedItems.append($li);
});

const $liSave = document.querySelector("li");
$liSave.addEventListener("click", () => {
  const buttonVal = $liSave.getAttribute("value");
  console.log(buttonVal);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${buttonVal}&appid=09335e290f36cab7997b39556d93e753`,
    {
      method: "GET", //GET is the default.
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $searchCity.innerHTML = data.name;
      $temp.innerHTML = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2);
      $wind.innerHTML = data.wind.speed;
      $humid.innerHTML = data.main.humidity;
    });

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=tempe&cnt=5&appid=09335e290f36cab7997b39556d93e753",
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});
