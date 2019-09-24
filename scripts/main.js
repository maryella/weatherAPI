
"use strict";

const weatherDiv = document.querySelector('[data-weather]');
const temperature = document.getElementById("temperature")
const place = document.getElementById("place")
const sunset = document.getElementById("sunset")
const sunrise = document.getElementById("sunrise")

const URL = `https://api.openweathermap.org/data/2.5/weather?
q=Atlanta,US&appid=2f4580c1da2a1471787ee4c356181fd1`;

function get(url){
    return fetch(url)
        .then(function(response){
           return response.json();
          })
        .then(function(data){
          return data;
          })
}

const weather = get(URL)   
    console.log(weather)
    weather.then(function(data){
        addLocationName(data)
        addTemp(data)
        addWind(data)
        addMap(data)
        addSunInfo(data)
 
    
    });

function addLocationName(data){
    let locationName = data.name
    place.innerHTML += locationName
}

function addTemp(data){
    let tempCelsius = Math.round(10*(data.main.temp -273.15))/10;
    let tempFahrenheit = ((parseFloat(tempCelsius) * 9/5) + 32)
    temperature.innerHTML += Math.round(tempFahrenheit)
}

function addWind(data){
    let windSpeed = data.wind.speed
    wind.innerHTML += `${windSpeed} mph`
}

function addMap(data){
    let lat = data.coord.lat
    let lon = data.coord.lon
    const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&output=embed`;
    const iFrame = document.createElement("iframe")
    iFrame.setAttribute("id", "mapFrame")
    iFrame.setAttribute('src', mapUrl)
    weatherDiv.appendChild(iFrame)
}

function addSunInfo(data){
    let sunRise = data.sys.sunrise
    let sunSet = data.sys.sunset
    sunSet = formatDate(sunSet)
    sunRise = formatDate(sunRise)
    sunrise.innerHTML += sunRise
    sunset.innerHTML += sunSet
   // console.log (sunRise, sunSet)
}

function formatDate(date){
    const a = new Date (date * 1000)
    let year = a.getFullYear();
    let month = a.getMonth();
    let day = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = `${hour}:${min}`
    return time
}