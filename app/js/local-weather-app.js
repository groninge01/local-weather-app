var baseUrlIcon = "http://openweathermap.org/img/w/";
var baseUrlWeather = "//api.openweathermap.org/data/2.5/weather?";
var apiKey = "&appid=e20788d5fc9f29f44032bd1ac7ca73d3";
var units = "&units=metric";
var symbolFahrenheit = "&deg;F";
var symbolCelsius = " &deg;C";
var windDirections = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"];

// Helper functions
function changeTempUnit(id){
  //Get contents off element clicked
  content = document.getElementById(id).innerText;
  var degrees = content.slice(0,-3);
  var isC = content.slice(-1);
  var newContent;
  if (isC === "C") {
    degrees = cToF(degrees);
    newContent = degrees + " " + symbolFahrenheit;
  } else {
    degrees = fToC(degrees);
    newContent = degrees + " " + symbolCelsius;
  }
  //Set new content of element clicked
  document.getElementById(id).innerHTML = newContent;
}

function cToF(degrees) {
  return (degrees * 1.8 + 32).toFixed(0);
}

function fToC(degrees) {
  return ((degrees - 32) * .5556).toFixed(0);
}

function getWindDirection(degrees) {
  var index = Math.round((degrees % 360) / 22.5);
  return windDirections[index];
}

function setContent(id,content) {
  document.getElementById(id).innerHTML = content;
}

// Main
var result = fetch('//freegeoip.net/json/').then(function(response) {
  return response.json();
}).then(function(data) {
    var lat = data.latitude;
    var lon = data.longitude;
    var url = baseUrlWeather + "lat=" + lat + "&lon=" + lon + apiKey + units;
    return fetch(url);
 })
 .then(function(response) {
      return response.json();
  })
  .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
  })

  // I'm using the result variable to show that you can continue to extend the chain from the returned promise
result.then(function(r) {
    // set url for weather icon
    var icon = baseUrlIcon + r.weather[0].icon + ".png";
    // convert epoch time to human readable date and times
    var d = new Date(r.dt * 1000);
    var sunrise = new Date(r.sys.sunrise * 1000);
    var sunset = new Date(r.sys.sunset * 1000);

    setContent('city',r.name);
    setContent('country',r.sys.country);
    setContent('weatherIcon',"<img class='u-max-full-width' src=" + icon + ">");
    setContent('temperature',r.main.temp.toFixed(0) + symbolCelsius);
    setContent('weatherDescription',r.weather[0].description);
    setContent('time',d.toTimeString().slice(0,5) + d.toDateString().slice(3,10));
    setContent('windSpeed',r.wind.speed);
    setContent('windDirection',getWindDirection(r.wind.deg) + " (" + r.wind.deg + ")");
    setContent('pressure',r.main.pressure);
    setContent('humidity',r.main.humidity);
    setContent('sunrise',sunrise.toTimeString().slice(0,5));
    setContent('sunset',sunset.toTimeString().slice(0,5));
});
