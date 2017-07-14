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
});
