var srch = document.getElementById("srch");
var srchBtn = document.getElementById("srchBtn");
var pstSrch = document.getElementById("pstSrch");
var mainDisp = document.getElementById("mainDisp");
var yest = document.getElementById("yest");
var tod = document.getElementById("tod");
var tom = document.getElementById("tom");

$(srchBtn).on("click", function(){
  saveSearch()
  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/weather?q="+srch.value+"&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data){
    console.log (data.main);
    var mainTxt ="Current Temp is: "+ data.main.temp;
    var highP = $("<p>").text("Today's High is: " + data.main.temp_max)
    var lowP =$("<p>").text("Today's Low is: " + data.main.temp_min)
    $("#mainDisp").text(mainTxt);
    $("#mainDisp").append(highP);
    $("#mainDisp").append(lowP);
    forecast()
  })
})

function forecast(){
  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/forecast?q="+srch.value+"&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"
  }).then(function(data){
    console.log (data.list[3])
    $("#tomorrow").removeClass("hide")
    var tomText = "Tomorrow's high is: "+ data.list[3].main.temp_max;
    $("#tom").text(tomText)
  })
}

function saveSearch(){
  var pastSearches = JSON.parse(localStorage.getItem("srchArray"))
  if(Array.isArray(pastSearches) ===true) {
    var srchArray = [srch.value] 
    console.log("this is past search",pastSearches)
    var comboArray = srchArray.concat(pastSearches)
    var srchStringArray = JSON.stringify(comboArray)
    localStorage.setItem("srchArray", srchStringArray)
  }else{
    console.log("woops")
    var srchArray = [srch.value]
    var srchStringArray = JSON.stringify(srchArray)
    localStorage.setItem("srchArray", srchStringArray)
  }
}