var baseUrlIcon = "http://openweathermap.org/img/w/";
var baseUrlWeather = "//api.openweathermap.org/data/2.5/weather?";
var apiKey = "&appid=e20788d5fc9f29f44032bd1ac7ca73d3";
var units = "&units=metric";
var symbolFahrenheit = "&deg;F";
var symbolCelsius = " &deg;C";
var temperature;
var symbolTemperature = symbolCelsius;
var div = document.getElementById('weather');

// Google font function
(function() {
  var link_element = document.createElement("link"),
    s = document.getElementsByTagName("script")[0];
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
    link_element.href = "http:";
  }
  link_element.href += "//fonts.googleapis.com/css?family=Noto+Sans:400italic,400,700italic,700";
  link_element.rel = "stylesheet";
  link_element.type = "text/css";
  s.parentNode.insertBefore(link_element, s);
})();

// Helper functions
function changeTempUnit(id){
  //Get contents off element clicked
  var content = document.getElementById(id).firstChild.nodeValue;
  var degrees = content.slice(0,5);
  var isF = content.slice(-1);
  var newContent;
  if (isF == "F") {
    degrees = cToF(degrees);
    newContent = degrees + " " + symbolFahrenheit + " | " + symbolCelsius;
  } else {
    degrees = fToC(degrees);
    newContent = degrees + " " + symbolCelsius + " | " + symbolFahrenheit;
  }
  //Set new content of element clicked
  document.getElementById(id).innerHTML = newContent;
}

function cToF(degrees) {
  return (degrees * 1.8 + 32).toFixed(2);
}

function fToC(degrees) {
  return ((degrees - 32) * .5556).toFixed(2);
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
    console.log(r); // 2nd request result
    // set url for weather icon
    var icon = baseUrlIcon + r.weather[0].icon + ".png";
    // convert epoch to human readable date
    var d = new Date(r.dt * 1000);
    var sunRise = new Date(r.sys.sunrise * 1000);
    var sunSet = new Date(r.sys.sunset * 1000);

    var content = "";
    content += "<div class='container'>";
    content += "<div class='row'><div class='twelve columns'><h4>Weather in " + r.name + ", " + r.sys.country + ".</h4></div></div>";
    content += "<div class='row'><div class='two columns'><img src=" + icon + "></div>";
    content += "<div class='ten columns'><span class='button' id='txtTemperature' onclick='changeTempUnit(this.id);'>" + r.main.temp + symbolCelsius + " | " + symbolFahrenheit + "</span></div></div>";
    content += "<div class='row'><div class='twelve columns'>" + r.weather[0].description + "</div></div>";
    content += "<div class='row'><div class='twelve columns'>" + d.toTimeString().slice(0,5) + d.toDateString().slice(3,10) + "</div></div>";
    content += "<div class='row'><div class='twelve columns'><table><tbody><content><td>Wind</td><td>" + r.wind.speed + " m/s, " + r.wind.deg + "</td></tr>";
    content += "<tr><td>Pressure</td><td>" + r.main.pressure + " hpa</td></tr>";
    content += "<tr><td>Humidity</td><td>" + r.main.humidity + " %</td></tr>";
    content += "<tr><td>Sunrise</td><td>" + sunRise.toTimeString().slice(0,5) + "</td></tr>";
    content += "<tr><td>Sunset</td><td>" + sunSet.toTimeString().slice(0,5) + "</td></tr></tbody>";
    content += "<tfoot><tr><td colspan=2><h6>Fetched from <a href='http://openweathermap.org/' target='_blank'>OpenWeatherMap</a>.</h6></td></tr></tfoot></table></div></div></div>"

    div.innerHTML += content;
});
