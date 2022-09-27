const $cityInput = $("#cityInput");

const currentApi = `api.openweathermap.org/data/2.5/weather?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;

const forecastApi = `api.openweathermap.org/data/2.5/forecast?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=tempe&appid=09335e290f36cab7997b39556d93e753",
  {
    method: "GET", //GET is the default.
  }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    const name = data.name;
    const temp = (data.main.temp - 273.15) * 1.8 + 32;
    const wind = data.wind.speed;
    const humid = data.main.humidity;
    console.log(name, temp.toFixed(2), wind, humid);
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
