// ** how to take the values out of local storage?
// ** how to turn those values and turn them into individual buttons?
// ** make those buttons function individually to recall the weather?
// Search Button and Main Area
$(document).ready(function() {
  clearButtons();
});
$(srchBtn).on("click", function() {
  var searchValue = $("#srch").val();
  console.log(searchValue);
  saveSearch(searchValue);
  getWeather(searchValue);
});
// **Dan: Set this as it's on function. Added searchValue.
function getWeather(searchValue) {
  // empty old info
  $(
    "#city, #mainDisp, #tod, #todDate, #tom, #tomDate, #dayAfter, #dayA, #dayAfterA, #dayAA, #dayAfterAA, #dayAAA"
  ).empty();
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchValue +
      "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data) {
    // Populating the main area
    var city = data.name;
    var img = $("<img>").attr(
      "src",
      "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    );
    var mainTxt = "Current Temp is: " + data.main.temp + "°F";
    var highP = $("<p>").text("Today's High is: " + data.main.temp_max + "°F");
    var lowP = $("<p>").text("Today's Low is: " + data.main.temp_min + "°F");
    var humTod = $("<p>").text("Humidity: " + data.main.humidity + "%");
    var wind = $("<p>").text("Wind Speed: " + data.wind.speed + " MPH");
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    $("#city").text(city);
    $("#mainDisp").text(mainTxt);
    $("#city").append(img);
    $("#mainDisp").append(highP);
    $("#mainDisp").append(lowP);
    $("#mainDisp").append(humTod);
    $("#mainDisp").append(wind);
    // populate 5 day forecast cards
    forecast(searchValue);
    // Add UV index to mainDisplay
    ultraViolent(lat, lon);
    // UV Index
  });
}
// **Dan: Removed this function from inside the onclick event -- added variables to function call
function ultraViolent(lat, lon) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data) {
    var uv = $("<p>").text("UV Index: " + data.value);
    $("#mainDisp").append(uv);
  });
}
// Forecast cards
function forecast(searchValue) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchValue +
      "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data) {
    $("#headingFore").removeClass("hide");
    // day 1 card
    $("#today").removeClass("hide");
    var todDat = data.list[0].dt_txt;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png"
    );
    var todText = $("<p>").text("High: " + data.list[0].main.temp_max + "°F");
    var lowTod = $("<p>").text("Low: " + data.list[0].main.temp_min + "°F");
    var humTod = $("<p>").text("Humidity: " + data.list[0].main.humidity + "%");
    $("#todDate").text(todDat);
    $("#tod").append(img);
    $("#tod").append(todText);
    $("#tod").append(lowTod);
    $("#tod").append(humTod);
    // day 2 card
    $("#tomorrow").removeClass("hide");
    var tomDat = data.list[8].dt_txt;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + data.list[8].weather[0].icon + ".png"
    );
    var tomText = $("<p>").text("High: " + data.list[8].main.temp_max + "°F");
    var lowTom = $("<p>").text("Low: " + data.list[8].main.temp_min + "°F");
    var humTom = $("<p>").text("Humidity: " + data.list[8].main.humidity + "%");
    $("#tomDate").text(tomDat);
    $("#tom").append(img);
    $("#tom").append(tomText);
    $("#tom").append(lowTom);
    $("#tom").append(humTom);
    // day 3 card
    $("#theDayAfter").removeClass("hide");
    var dat = data.list[16].dt_txt;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        data.list[16].weather[0].icon +
        ".png"
    );
    var high = $("<p>").text("High: " + data.list[16].main.temp_max + "°F");
    var low = $("<p>").text("Low: " + data.list[16].main.temp_min + "°F");
    var hum = $("<p>").text("Humidity: " + data.list[16].main.humidity + "%");
    $("#dayA").text(dat);
    $("#dayAfter").append(img);
    $("#dayAfter").append(high);
    $("#dayAfter").append(low);
    $("#dayAfter").append(hum);
    // day 4 card
    $("#theDayAfterA").removeClass("hide");
    var dat = data.list[24].dt_txt;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        data.list[24].weather[0].icon +
        ".png"
    );
    var high = $("<p>").text("High: " + data.list[24].main.temp_max + "°F");
    var low = $("<p>").text("Low: " + data.list[24].main.temp_min + "°F");
    var hum = $("<p>").text("Humidity: " + data.list[24].main.humidity + "%");
    $("#dayAA").text(dat);
    $("#dayAfterA").append(img);
    $("#dayAfterA").append(high);
    $("#dayAfterA").append(low);
    $("#dayAfterA").append(hum);
    // day 5 card
    $("#theDayAfterAA").removeClass("hide");
    var dat = data.list[32].dt_txt;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" +
        data.list[32].weather[0].icon +
        ".png"
    );
    var high = $("<p>").text("High: " + data.list[32].main.temp_max + "°F");
    var low = $("<p>").text("Low: " + data.list[32].main.temp_min + "°F");
    var hum = $("<p>").text("Humidity: " + data.list[32].main.humidity + "%");
    $("#dayAAA").text(dat);
    $("#dayAfterAA").append(img);
    $("#dayAfterAA").append(high);
    $("#dayAfterAA").append(low);
    $("#dayAfterAA").append(hum);
  });
}
var pastSearches = JSON.parse(localStorage.getItem("srchArray")) || [];
// Saving searches to local storage
function saveSearch(searchValue) {
  if (Array.isArray(pastSearches) === true) {
    pastSearches.push(searchValue);
    // console.log(pastSearches);
    // var comboArray = srchArray.push(pastSearches);
    // console.log(comboArray);
    var srchStringArray = JSON.stringify(pastSearches);
    localStorage.setItem("srchArray", srchStringArray);
  } else {
    pastSearches.push(searchValue);
    var srchStringArray = JSON.stringify(pastSearches);
    localStorage.setItem("srchArray", srchStringArray);
  }
  clearButtons();
}
function clearButtons() {
  var storedArrayItems = JSON.parse(localStorage.getItem("srchArray"));
  var pastSearchDisplay = $("#pstSrch");
  pastSearchDisplay.empty();
  for (var i = 0; i < storedArrayItems.length; i++) {
    // pastSearchDisplay.empty();
    var srchBtn = $("<button>");
    $(srchBtn).addClass("saved btn btn-info");
    console.log(pastSearches);
    srchBtn.text(pastSearches[i]);
    pastSearchDisplay.append(srchBtn);
    // srchBtn.appendTo("#pstSrch");
  }
}

// Relevant weather to button press
// ** thank you Dan I couldn't have done this without you!
$("#pstSrch")
  .first()
  .on("click", ".saved", function() {
    $(".saved").val("");
    var searchValue = $(this).text();
    getWeather(searchValue);
  });

// Deleting saved storage
$("#clear").on("click", function() {
  localStorage.clear();
  location.reload();
});
