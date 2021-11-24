//* Primary Declarations
const fiveDayForcastDiv = document.getElementById("fiveDayForcast");
const townName = document.getElementById("townName");

const zipcodeUserInput = document.getElementById("inputZipcode");
const loadWeatherBtn = document.getElementById("loadPageBtn");

// figuring what date it is CURRENTLY
const myDate = new Date();

const currTimeStamp = Math.floor(Date.now() / 1000);

let currDay = myDate.getDay();
// console.log(currDay);

let currHour = myDate.getHours();
let currMin = myDate.getMinutes();
let currSecond = myDate.getSeconds();
// console.log(`Current Time: ${currHour}:${currMin}:${currSecond}`);

// weekday array
const weekday = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

//? POPULATING DOM
function populateDOM(weatherData) {
  console.log(weatherData);

  //*Town Component
  let townCoordComponent = weatherLocation(weatherData);
  townName.appendChild(townCoordComponent);

  const weatherList = weatherData.list;
  // console.log(weatherList[0]);

  let forcastDayNum = currDay;

  //! FOR EACH FUNCTION !////! LOOPING HERE !//
  weatherList.forEach((el, i, arr) => {
    let time = weatherList[i].dt_txt;

    if (time.includes("12:00:00")) {
      forcastDayNum += 1;
      if (forcastDayNum === 7) {
        forcastDayNum = 0;
      }

      let weatherCardComponent = weatherCard(el, i, forcastDayNum);
      fiveDayForcastDiv.appendChild(weatherCardComponent);
    }
  });
}

//!API CALL
// insert before appID to get by zipcond zip=84664
//make modulur to flex!
function getAPIData(zipcode) {
  removeChildren(fiveDayForcastDiv);
  removeChildren(townName);

  fetch(
    `//api.openweathermap.org/data/2.5/forecast?zip=${zipcode}&appid=4b64502c5d4b776a5ff49a9a960fbe1c&units=imperial`
  )
    .then((data) => data.json())
    .then((data) => populateDOM(data))
    .catch((error) => console.log(error));
}

//TODO: COMPONENTS
function weatherLocation(weatherData, timeData) {
  let townNameHeader = document.createElement("h2");
  let townCoord = document.createElement("p");
  let townCoordDiv = document.createElement("div");

  let timeZoneLatLon = document.createElement("p");
  timeZoneLatLon.className = "localTimeZoneP";

  townNameHeader.textContent = weatherData.city.name;
  townCoord.textContent = `Latitude: ${weatherData.city.coord.lat}, Longitude: ${weatherData.city.coord.lon}`;

  townCoordDiv.appendChild(townNameHeader);
  townCoordDiv.appendChild(townCoord);
  townCoordDiv.appendChild(timeZoneLatLon);
  return townCoordDiv;
}

function weatherCard(data, i, forcastDayNum) {
  let dayName = document.createElement("h2");
  let tempData = document.createElement("h1");
  let icon = document.createElement("img");

  icon.setAttribute("width", "1600");
  icon.setAttribute("height", "500");

  let windSpeedI = document.createElement("i");
  let windspeedText = document.createElement("p");
  let windSpeedSection = document.createElement("section");

  let visionI = document.createElement("i");
  let visionText = document.createElement("p");
  let visionSection = document.createElement("section");

  let maxTempI = document.createElement("i");
  let maxTempText = document.createElement("p");
  let maxTempDiv = document.createElement("div");
  let minTempI = document.createElement("i");
  let minTempText = document.createElement("p");
  let minTempDiv = document.createElement("div");
  let tempMaxMinDiv = document.createElement("div");

  dayName.textContent = weekday[forcastDayNum];
  tempData.innerHTML = `${data.main.temp} &#176;`;
  let iconCode = data.weather[0].icon;
  let iconPath = `//openweathermap.org/img/w/${iconCode}.png`;
  icon.src = iconPath;

  windSpeedI.className = `fas fa-wind`;
  windspeedText.textContent = data.wind.speed;

  visionI.className = `fas fa-eye`;
  visionText.textContent = data.visibility;

  maxTempI.className = `fas fa-thermometer-full`;
  maxTempText.innerHTML = `${data.main.temp_max} &#176;`;
  minTempI.className = `fas fa-thermometer-quarter`;
  minTempText.innerHTML = `${data.main.temp_min} &#176;`;

  windSpeedSection.appendChild(windSpeedI);
  windSpeedSection.appendChild(windspeedText);
  windSpeedSection.className = `windSection`;

  visionSection.appendChild(visionI);
  visionSection.appendChild(visionText);
  visionSection.className = `visionSection`;

  maxTempDiv.appendChild(maxTempI);
  maxTempDiv.appendChild(maxTempText);
  minTempDiv.appendChild(minTempI);
  minTempDiv.appendChild(minTempText);
  tempMaxMinDiv.appendChild(maxTempDiv);
  tempMaxMinDiv.appendChild(minTempDiv);
  tempMaxMinDiv.className = `tempMaxMin`;

  let weatherSubInfoDiv = document.createElement("div");
  weatherSubInfoDiv.appendChild(windSpeedSection);
  weatherSubInfoDiv.appendChild(visionSection);
  weatherSubInfoDiv.appendChild(tempMaxMinDiv);
  weatherSubInfoDiv.className = "weatherSubDiv";

  let weatherCard = document.createElement("div");
  weatherCard.className = `card`;
  weatherCard.appendChild(dayName);
  weatherCard.appendChild(icon);
  weatherCard.appendChild(tempData);
  weatherCard.appendChild(weatherSubInfoDiv);
  return weatherCard;
}

//*Calling Functions
getAPIData(84664);

//?BTNS
loadWeatherBtn.addEventListener("click", () => {
  let userZipcode = zipcodeUserInput.value;
  getAPIData(userZipcode);
});

//! Utility Funcions ///////////
function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//? GET TIME
const currTime = function (timeZone) {
  let options = {
    timeZone: `${timeZone}`,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  let formatter = new Intl.DateTimeFormat([], options);
  console.log(formatter.format(new Date()));

  setTimeout(currTime, 1000);
};