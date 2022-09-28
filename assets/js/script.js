const $cityInput = $("#cityInput");
const currentApi = `api.openweathermap.org/data/2.5/weather?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;
const forecastApi = `api.openweathermap.org/data/2.5/forecast?q=${$cityInput}&APPID=09335e290f36cab7997b39556d93e753`;
const $searchBtn = document.getElementById("searchBtn");
const $searchCity = document.getElementById("searchCity");
const $temp = document.getElementById("temp");
const $wind = document.getElementById("wind");
const $humid = document.getElementById("humidity");
const $savedItems = document.getElementById("savedItems");
const forecastRow = document.getElementById("forecastRow");
const storage = [];

async function apiCall() {
  let searchInput = document.getElementById("searchInput").value;
  storage.push(searchInput);

  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=09335e290f36cab7997b39556d93e753`,
    {
      method: "GET", //GET is the default.
    }
  )
    .then(function (response) {
      searchInput = "";
      return response.json();
    })
    .then(function (data) {
      $searchCity.innerHTML = data.name;
      $temp.innerHTML = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(0);
      $wind.innerHTML = data.wind.speed;
      $humid.innerHTML = data.main.humidity;
      const $li = document.createElement("li");
      $li.textContent = data.name.toUpperCase();
      $li.setAttribute("class", "btn btn-outline-success");
      $li.setAttribute("style", "margin-bottom: 10px; letter-spacing: .2rem;");
      $li.setAttribute("type", "button");
      $li.setAttribute("value", data.name);
      $savedItems.append($li);
      localStorage.setItem("location", JSON.stringify(storage));
    });

  await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=tempe&cnt=5&appid=09335e290f36cab7997b39556d93e753",
    {
      method: "GET",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.list.forEach((day) => {
        let section = document.createElement("section");
        section.setAttribute("class", "col forecastDay");
        let h5 = document.createElement("h5");
        let temp = document.createElement("h6");
        let wind = document.createElement("h6");
        let humid = document.createElement("h6");
        h5.innerHTML = day.dt;
        temp.innerHTML =
          "Temp: " + ((day.main.temp - 273.15) * 1.8 + 32).toFixed(0);
        wind.innerHTML = "Wind: " + day.wind.speed;
        humid.innerHTML = "Humid: " + day.main.humidity;
        section.append(h5, temp, wind, humid);
        forecastRow.append(section);
      });
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
  localStorage.setItem("location", JSON.stringify(storage));
  $savedItems.append($li);
});

const $liSave = document.querySelectorAll("li");

$liSave.forEach((li) => {
  li.addEventListener(
    "click",

    async function runbutton() {
      const buttonVal = li.getAttribute("value");
      console.log(buttonVal);
      await fetch(
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
          $temp.innerHTML = ((data.main.temp - 273.15) * 1.8 + 32).toFixed(0);
          $wind.innerHTML = data.wind.speed;
          $humid.innerHTML = data.main.humidity;
        });

      await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${buttonVal}&cnt=5&appid=09335e290f36cab7997b39556d93e753`,
        {
          method: "GET",
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          data.list.forEach((day) => {
            let section = document.createElement("section");
            section.setAttribute("class", "col forecastDay");
            let h5 = document.createElement("h5");
            let temp = document.createElement("h6");
            let wind = document.createElement("h6");
            let humid = document.createElement("h6");
            h5.innerHTML = day.dt;
            temp.innerHTML =
              "Temp: " + ((day.main.temp - 273.15) * 1.8 + 32).toFixed(0);
            wind.innerHTML = "Wind: " + day.wind.speed;
            humid.innerHTML = "Humid: " + day.main.humidity;
            section.append(h5, temp, wind, humid);
            forecastRow.append(section);
          });
        });
      //     <section class="col forecastDay">
      //     <h5 id="date">date: </h5>
      //     <h6 id="temp">Temp: </h6>
      //     <h6 id="wind">Wind: </h6>
      //     <h6 id="humidity">Humidity: </h6>
      //     </section>
    }
  );
});
