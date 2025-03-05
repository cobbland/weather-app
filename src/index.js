import "./styles.css";
import { Weather } from "./weather";

const pageBody = document.querySelector("body");
const weatherDOM = document.createElement("p");
const tempDOM = document.createElement("p");
const iconDOM = document.createElement("p");

iconDOM.innerText = "👋";
weatherDOM.innerText = "Weather?";
tempDOM.innerText = "Temp?"

pageBody.appendChild(iconDOM);
pageBody.appendChild(weatherDOM);
pageBody.appendChild(tempDOM);

const weather = new Weather('lynchburg,va');

const tempColors = {
    0: '#003366',   // 0°F - 10°F
    10: '#00509E',  // 10°F - 20°F
    20: '#0077B6',  // 20°F - 30°F
    30: '#0096C7',  // 30°F - 40°F
    40: '#00B4D8',  // 40°F - 50°F
    50: '#48CAE4',  // 50°F - 60°F
    60: '#90E0EF',  // 60°F - 70°F
    70: '#FFD166',  // 70°F - 80°F
    80: '#FF9F1C',  // 80°F - 90°F
    90: '#FF6B6B',  // 90°F - 100°F
};

weather.getNowWeather().then(result => weatherDOM.innerText = result)
weather.getNowTemp().then(result => {
    tempDOM.innerText = `${Math.round(result)}°F`;
    const roundedTemp = Math.floor(result / 10) * 10;
    pageBody.style['background-color'] = tempColors[roundedTemp];
})
weather.getNowIcon().then(result => {
    iconDOM.innerHTML = `<img src="./icons/${result}.svg">`;
}) //Doesn't work. Can't find icon.


