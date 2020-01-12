// var srch = document.getElementById("srch");
// var srchBtn = document.getElementById("srchBtn");
// var pstSrch = document.getElementById("pstSrch");
// var mainDisp = document.getElementById("mainDisp");
// var yest = document.getElementById("yest");
// var tod = document.getElementById("tod");
// var tom = document.getElementById("tom");

$(srchBtn).on("click", function(){
  saveSearch();
  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/weather?q="+srch.value+"&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data){
    console.log (data.main);
    var city = data.name;
    var mainTxt ="Current Temp is: "+ data.main.temp  + "°F";
    var highP = $("<p>").text("Today's High is: " + data.main.temp_max  + "°F");
    var lowP =$("<p>").text("Today's Low is: " + data.main.temp_min + "°F");
    var humTod = $("<p>").text("Humidity: "+ data.main.humidity + "%");
    var wind = $("<p>").text("Wind Speed: "+ data.wind.speed + " MPH");
    $("#city").text(city)
    $("#mainDisp").text(mainTxt);
    $("#mainDisp").append(highP);
    $("#mainDisp").append(lowP);
    $("#mainDisp").append(humTod);
    $("#mainDisp").append(wind);
    forecast();
  })
})

function forecast(){
  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/forecast?q="+srch.value+"&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data){
    console.log (data.list)
    $("#today").removeClass("hide");
    var todDat = data.list[0].dt_txt;
    var todWea = data.list[0].weather[0].description;
    var todText = $("<p>").text("High: "+ data.list[0].main.temp_max + "°F");
    var lowTod = $("<p>").text("Low: "+ data.list[0].main.temp_min + "°F");
    var humTod = $("<p>").text("Humidity: "+ data.list[0].main.humidity + "%");
    $("#todDate").text(todDat);
    $("#tod").text(todWea);
    $("#tod").append(todText);
    $("#tod").append(lowTod);
    $("#tod").append(humTod);

    $("#tomorrow").removeClass("hide");
    var tomDat = data.list[1].dt_txt;
    var tomWea = data.list[1].weather[0].description;
    var tomText = $("<p>").text("High: "+ data.list[1].main.temp_max + "°F");
    var lowTom = $("<p>").text("Low: "+ data.list[1].main.temp_min + "°F");
    var humTom = $("<p>").text("Humidity: "+ data.list[1].main.humidity + "%");
    $("#tomDate").text(tomDat);
    $("#tom").text(tomWea);
    $("#tom").append(tomText);
    $("#tom").append(lowTom);
    $("#tom").append(humTom);
  })
}

function saveSearch(){
  var pastSearches = JSON.parse(localStorage.getItem("srchArray"));
  if(Array.isArray(pastSearches) ===true) {
    var srchArray = [srch.value] 
    console.log("this is past search",pastSearches);
    var comboArray = srchArray.concat(pastSearches);
    var srchStringArray = JSON.stringify(comboArray);
    localStorage.setItem("srchArray", srchStringArray);
  }else{
    console.log("woops")
    var srchArray = [srch.value];
    var srchStringArray = JSON.stringify(srchArray);
    localStorage.setItem("srchArray", srchStringArray);
  }
}