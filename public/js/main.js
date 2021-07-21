const submitBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const city = document.getElementById("city");
const dataHide = document.querySelector('.middle-layer').classList;


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var dayName = days[d.getDay()];
var date = d.getDate();

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];


document.getElementById("day").innerHTML = dayName;
document.getElementById("date").innerHTML = date+ " "+ n;

const getInfo = async(event)=>{
   event.preventDefault();
   let cityVal = cityName.value;
   if(cityName === ""){
         city.innerHTML = "Please Enter a City Name.";
         dataHide.add('data_hide');
   }else{
      try{
         const appId = "548a4c81dcc7c1e449016f0e743f39be";
         const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityVal + "&appid=" + appId + "&units=metric";
         const response = await fetch(url);
         const data = await response.json();
         const arrData = [data];
         document.getElementById("city").innerHTML = arrData[0].name+", "+arrData[0].sys.country;
         document.getElementById("temp").innerHTML = arrData[0].main.temp + "&degC";
         document.getElementById("description").innerHTML = arrData[0].weather[0].description ;
         document.getElementById("feels-like").innerHTML ="Feel-Like: "+ arrData[0].main.feels_like + " &degC";
         document.getElementById("pressure").innerHTML = "Pressure: "+arrData[0].main.pressure + " hPa";
         document.getElementById("humidity").innerHTML ="Humidity: "+ arrData[0].main.humidity + " %";
         const imgUrl = "http://openweathermap.org/img/wn/"+arrData[0].weather[0].icon+"@2x.png";
         document.getElementById("temp-img").setAttribute('src', imgUrl);
         document.getElementById("wind").innerHTML = "Wind Speed: "+arrData[0].wind.speed+" m/s";
         dataHide.remove('data_hide');
      }
      catch{
         city.innerHTML = "Please Enter a Valid City Name.";
         dataHide.add('data_hide');
      }
  
   }
}

submitBtn.addEventListener("click",getInfo)