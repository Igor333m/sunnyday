'use strict';
const weatherData = {
  tempUnit: "c",
  windSpeedUnit: "m/s",
  week: [
    {
      day: "Mon",
      temp: 22,
      windDirection: "north-east",
      windSpeed: 10,
      type: "sunny"
    },
    {
      day: "Tue",
      temp: 14,
      windDirection: "north-west",
      windSpeed: 14,
      type: "rainy"
    },
    {
      day: "Wed",
      temp: 17,
      windDirection: "south-east",
      windSpeed: 20,
      type: "cloudy"
    },
    {
      day: "Thu",
      temp: 17,
      windDirection: "south-east",
      windSpeed: 20,
      type: "sunny"
    },
    {
      day: "Fri",
      temp: 17,
      windDirection: "south-east",
      windSpeed: 20,
      type: "cloudy"
    },
    {
      day: "Sat",
      temp: 17,
      windDirection: "north-west",
      windSpeed: 20,
      type: "cloudy"
    },
    {
      day: "Sun",
      temp: 17,
      windDirection: "south-east",
      windSpeed: 20,
      type: "rainy"
    }
  ]
};



const element = document.getElementById("main"),
  dayInWeek = document.getElementsByClassName("dayInWeek")[0],
  wetherIcon = document.getElementsByClassName("wetherIcon")[0],
  temperature = document.getElementsByClassName("temperature")[0],
  windSpeeds = document.getElementsByClassName("windSpeed")[0],
  windDirections = document.getElementsByClassName("windDirections")[0],
  modal = document.getElementById("modal"),
  close = document.getElementsByClassName("close")[0];

// Get current location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(function(position) {

    let openWeather5dayData = null;

    const curentPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }


    /*
    * Free code camp Weather api
    * Fcc endpoint example 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139
    * Fetch data with lat&lon
    */
    const urlWeatherMap = 'https://fcc-weather-api.glitch.me/api/current'; //?lat=35&lon=139

    fetch(`${urlWeatherMap}?lat=${curentPosition.latitude}&lon=${curentPosition.longitude}`)
      .then(data => {return data.json()})
      .then(results => {
        showToday(results);
      })
      .catch(err => console.log(err))

    /*
    * Openweathermap.org api
    * Openweathermap 5 day endpoint example "http://api.openweathermap.org/data/2.5/forecast?lat=113.2&lon=23.6&APPID=111111111111111111111"
    * Fetch data with lat&lon
    */
    const OpenWeatherUrlWeatherMap = 'https://api.openweathermap.org/data/2.5/forecast';
    
    fetch(`${OpenWeatherUrlWeatherMap}?lat=${curentPosition.latitude}&lon=${curentPosition.longitude}&APPID=799d024701320e733102ddfe7106d53c`)
      .then(data => {return data.json()})
      .then(results => {
        console.log("Open Weather data", results);
        openWeather5dayData = results;
      })
      .catch(err => console.log(err))
  })
} else {
  alert('geolocation IS NOT available');
}

function showToday(weatherData) {
  // console.log("Fcc data: ", weatherData);
  const date = new Date();

  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[date.getDay()];
  const currentTemp = Math.round(weatherData.main.temp);
  const windSpeed = weatherData.wind.speed;
  const windDirections = weatherData.wind.deg;
  //openModal(today, currentTemp, windSpeed, windDirections)

}

console.log("currentTemp: ", Math.round(currentTemp));


openWeather5dayData.list.week.forEach(day => {
  const eachDay = document.createElement("li");
  eachDay.classList.add(day.day);

  eachDay.addEventListener("click", function() {
  	windArrow(day.windDirection);
  	openModal(day.day, day.type, day.temp, day.windSpeed, day.windDirection);
  });
  
  eachDay.innerHTML = `<span class='day'>${day.dt}</span><span class='temp'>${day.main.temp}</span>`;
  element.appendChild(eachDay);
});

function windArrow(direction) {
  if (direction === "north-east") {
    windDirections.classList.add("north-east");
  } else {
    windDirections.classList.add("south-east");
  }
}

function openModal(day, temp, windSpeed, windDirection) {
 	dayInWeek.innerText = day;
  //wetherIcon.innerText = type;
  temperature.innerText = temp;
  windSpeeds.innerText = `WindSpeed ${windSpeed}`;
  windDirections.innerText = windDirection;
  modal.style.display = "block";
}

window.onclick = function(event) {
console.log(event.target);
    if (event.target === modal || event.target === close) {
        modal.style.display = "none";
    }
}