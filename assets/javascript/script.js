// Search Button and Main Area
$(srchBtn).on("click", function() {
  saveSearch();

  // empty old info
  $(
    "#city, #mainDisp, #tod, #todDate, #tom, #tomDate, #dayAfter, #dayA, #dayAfterA, #dayAA, #dayAfterAA, #dayAAA"
  ).empty();
  $.ajax({
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      srch.value +
      "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data) {
    // Populating the main area
    var city = data.name;
    var img = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
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
    forecast();

    // Add UV index to mainDisplay
    ultraViolent();

    // UV Index
    function ultraViolent() {
      $.ajax({
        url:
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
      }).then(function(data) {
        var uv = $("<p>").text("UV Index: " + data.value);
        $("#mainDisp").append(uv);
      });
    }
  });
});

// Forecast cards
function forecast() {
  $.ajax({
    url:
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      srch.value +
      "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data) {

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
// Saving searches to local storage
function saveSearch() {
  var pastSearches = JSON.parse(localStorage.getItem("srchArray"));
  if (Array.isArray(pastSearches) === true) {
    var srchArray = [srch.value];
    console.log("this is past search", pastSearches);
    var comboArray = srchArray.concat(pastSearches);
    var srchStringArray = JSON.stringify(comboArray);
    localStorage.setItem("srchArray", srchStringArray);
  } else {
    var srchArray = [srch.value];
    var srchStringArray = JSON.stringify(srchArray);
    localStorage.setItem("srchArray", srchStringArray);
  }

    for(var i = 0; i < srchArray.length; i++) {
      var srchBtn = $("<button>");
      srchBtn.text(srchArray[i]);
      srchBtn.appendTo("#pstSrch");
    }
  }
