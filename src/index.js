import "./styles.css";
import { Weather } from "./weather";
import { weatherIcons } from "./icons";

const pageBody = document.querySelector("body");
const weatherSearch = document.querySelector("form");
const weatherSearchInput = document.querySelector("input");
const locationDOM = document.querySelector(".city-name");
const weatherContainerNow = document.querySelector('.weather-container-now');
const weatherContainerToday = document.querySelector('.weather-container-today');
const weatherContainerTomorrow = document.querySelector('.weather-container-tomorrow');
const weatherContainerNext = document.querySelector('.weather-container-next');
const tempColors = {
    0: '#E0F7FA',   // 0°F - 10°F
    10: '#B2EBF2',  // 10°F - 20°F
    20: '#80DEEA',  // 20°F - 30°F
    30: '#4DD0E1',  // 30°F - 40°F
    40: '#26C6DA',  // 40°F - 50°F
    50: '#00BCD4',  // 50°F - 60°F
    60: '#FFEE58',  // 60°F - 70°F
    70: '#FFD54F',  // 70°F - 80°F
    80: '#FFB74D',  // 80°F - 90°F
    90: '#FF8A65',  // 90°F - 100°F
    100: '#FF7043', // 100°F - 110°F
    110: '#FF5722', // 110°F - 120°F
    120: '#F4511E', // 120°F - 130°F
    130: '#E64A19', // 130°F - 140°F
    140: '#D84315', // 140°F - 150°F
};

let weatherLocation = 'lynchburg,va'
let weather;

async function buildWeather(weatherLocation) {
    try {
        // now
        weather = new Weather(weatherLocation);
        await weather.getWeatherJSON();
        const weatherInfo = weather.getWeatherInfo();
        console.log(weatherInfo)
        locationDOM.innerText = weatherInfo.location;
        buildWeatherHelper('now', weatherInfo, weatherContainerNow);
        buildWeatherHelper('today', weatherInfo, weatherContainerToday);
        buildWeatherHelper('tomorrow', weatherInfo, weatherContainerTomorrow);
        buildWeatherHelper('next', weatherInfo, weatherContainerNext)
    } catch (err) {
        console.log(`Can't get weather for ${weatherLocation}. Error: ${err}`);
    }
}

function buildWeatherHelper(day, weatherInfo, container) {
    const weatherDOM = container.querySelector('.weather');
    const tempDOM = container.querySelector('.temp');
    const iconDOM = container.querySelector('.icon')
    weatherDOM.innerText = weatherInfo[day].condition;
    const nowTemp = weatherInfo[day].temp;
    tempDOM.innerText = `${Math.round(nowTemp)}°F`;
    const roundedTemp = Math.floor(nowTemp / 10) * 10;
    pageBody.style["background-color"] = tempColors[roundedTemp];
    const icon = weatherInfo[day].icon;
    iconDOM.innerHTML = `<img src="${weatherIcons[icon]}" alt="${icon}">`;
}

buildWeather(weatherLocation);

weatherSearch.addEventListener("submit", (submit) =>{
    submit.preventDefault();
    weatherLocation = weatherSearchInput.value;
    buildWeather(weatherLocation);
})