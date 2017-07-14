var baseUrlIcon = "http://openweathermap.org/img/w/";
var baseUrlWeather = "//api.openweathermap.org/data/2.5/weather?";
var apiKey = "&appid=e20788d5fc9f29f44032bd1ac7ca73d3";
var units = "&units=metric";
var symbolFahrenheit = "&deg;F";
var symbolCelsius = "&deg;C";
var temperature;
var symbolTemperature = symbolCelsius;

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


var weatherData = fetch('//api.openweathermap.org/data/2.5/weather?lat=52.6446&lon=4.755&appid=e20788d5fc9f29f44032bd1ac7ca73d3&units=metric').then(function(response) {
	// Convert to JSON
  var j = response.json();
  console.log(j);
  return j;
  }).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

weatherData.then(function(data) {
    console.log(data);
  });

var geoData = fetch('//freegeoip.net/json/').then(function(response) {
	// Convert to JSON
	return response.json();
});

var lat,lon;

geoData.then(function(data) {
  lat = data.latitude;
  lon = data.longitude;
 }).then(function() {
  var url = baseUrlWeather + "lat=" + lat + "&lon=" + lon + apiKey + units;
  console.log(url);

});




//console.log(geoData);


$(document).ready(function() {


  console.log("weather done?");



});
