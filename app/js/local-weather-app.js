var baseUrlIcon = "http://openweathermap.org/img/w/";
var baseUrlWeather = "//api.openweathermap.org/data/2.5/weather?";
var apiKey = "&appid=e20788d5fc9f29f44032bd1ac7ca73d3";
var units = "&units=metric";
var symbolFahrenheit = "&deg;F";
var symbolCelsius = " &deg;C";
var temperature;
var symbolTemperature = symbolCelsius;
var tbody = document.getElementById('tbody');

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
function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
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
    var tr = "<tr>";
    tr += "<td colspan=2>Weather in " + r.name + ", " + r.sys.country + "<br>";
    tr += "<img src=" + icon + ">" + r.main.temp + symbolCelsius + "|" + symbolFahrenheit + "<br>";
    tr += r.weather[0].description + "<br>";
    tr += d.toTimeString().slice(0,5) + d.toDateString().slice(3,10) + "</td></tr>";
    tr += "<tr><td>Wind</td><td>" + r.wind.speed + " m/s, " + r.wind.deg + "</td></tr>";
    tr += "<tr><td>Pressure</td><td>" + r.main.pressure + " hpa</td></tr>";
    tr += "<tr><td>Humidity</td><td>" + r.main.humidity + " %</td></tr>";
    tr += "<tr><td>Sunrise</td><td>" + sunRise.toTimeString().slice(0,5) + "</td></tr>";
    tr += "<tr><td>Sunset</td><td>" + sunSet.toTimeString().slice(0,5) + "</td></tr>";

    tbody.innerHTML += tr;
});
