//const wrapper = document.querySelector(".wrapper"),
//inputPart = document.querySelector(".input-part"),
//infoTxt = inputPart.querySelector(".info-txt"),
const inputField = document.getElementById("search");
const locationBtn = document.getElementById("loc");
const closeBtn = document.getElementById("close");
const flashmes = document.getElementById("flash");
const message = document.getElementById("mess");
//const date = document.getElementById("date");
const city = document.getElementById("city");
const country = document.getElementById("country");
const temp1 = document.getElementById("temp");
const feels = document.getElementById("feels");
const hum = document.getElementById("hum");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");
const vis = document.getElementById("vis");
const spd = document.getElementById("spd");
const cloud = document.getElementById("cloud");
const sunr = document.getElementById("sunr");
const suns = document.getElementById("suns");
/*weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
*/

let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

closeBtn.addEventListener("click", () => {
  flashmes.style.display = "none";
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=####`;
  fetchData();
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=####`;
  fetchData();
}

function onError(error) {
  mess.innerText = error.message;
  flashmes.style.display = "block";
  //locationBtn.classList.add("error");
}

function fetchData() {
  mess.innerText = "Getting weather details...";
  flashmes.style.display = "block";
  //infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      flashmes.innerText = "Something went wrong";
      flashmes.style.display = "block";
      //mess.classList.replace("pending", "error");
    });
}

async function fetchLocation() {
  const response = await fetch(`http://ip-api.com/json`);
  const data = await response.json();
  const lat = data.lat;
  const lon = data.lon;
  const city = data.city;
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=####`;
  fetchData();
}

window.onload = fetchLocation;

function convertUnix(unixcode, timezone) {
  var res = timezone - 19800;
  var date = new Date((unixcode + res) * 1000);
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return hours + ":" + minutes + ":" + seconds;
}

function weatherDetails(info) {
  if (info.cod == "404") {
    //infoTxt.classList.replace("pending", "error");
    mess.innerText = `${inputField.value} isn't a valid city name`;
    flashmes.style.display = "block";
  } else {
    flashmes.style.display = "none";
    const city1 = info.name;
    const country1 = info.sys.country;
    const descrip = info.weather[0].description;
    const { temp, feels_like, humidity } = info.main;
    const visibility = info.visibility;
    const { speed, deg } = info.wind;
    const clouds = info.clouds.all;
    const { sunrise, sunset } = info.sys;
    const icon1 = info.weather[0].icon;
    const timezone = info.timezone;

    const icon2 = `http://openweathermap.org/img/wn/${icon1}@2x.png`;

    city.innerText = city1;
    country.innerText = country1;
    desc.innerText = descrip;
    temp1.innerText = temp + "° celsius";
    feels.innerText = "RealFeel " + feels_like + "°";
    hum.innerText = "Humidity : " + humidity + " %";
    icon.src = icon2;
    vis.innerText = "Visibility : " + visibility / 1000 + " Km";
    spd.innerText = "Wind Speed : " + speed * 3.6 + " Km/h , " + deg + "°";
    cloud.innerText = "Cloud Cover : " + clouds + " %";
    sunr.innerText = "Sunrise : " + convertUnix(sunrise, timezone);
    suns.innerText = "Sunset : " + convertUnix(sunset, timezone);
    console.log(timezone);
  }
}

/*arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});*/
