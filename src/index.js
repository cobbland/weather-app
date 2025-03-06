import "./styles.css";
import { Weather } from "./weather";
import { weatherIcons } from "./icons";

const pageBody = document.querySelector("body");
const weatherSearch = document.querySelector("form");
const weatherSearchInput = document.querySelector("input");
const tempSwitch = document.querySelector('.temp-switch');
const fButton = document.querySelector('.f');
const cButton = document.querySelector(".c");
const locationDOM = document.querySelector(".city-name");
const weatherContainerNow = document.querySelector('.weather-container-now');
const weatherContainerToday = document.querySelector('.weather-container-today');
const weatherContainerTomorrow = document.querySelector('.weather-container-tomorrow');
const weatherContainerNext = document.querySelector('.weather-container-next');
const tempColors = {
    '-50': 'linear-gradient(135deg, #001F3F, #003366)', // -50°F - -40°F
    '-40': 'linear-gradient(135deg, #003366, #00509E)', // -40°F - -30°F
    '-30': 'linear-gradient(135deg, #00509E, #0077B6)', // -30°F - -20°F
    '-20': 'linear-gradient(135deg, #0077B6, #0096C7)', // -20°F - -10°F
    '-10': 'linear-gradient(135deg, #0096C7, #00B4D8)', // -10°F - 0°F
    0: 'linear-gradient(135deg, #00B4D8, #00ACC1)',     // 0°F - 10°F
    10: 'linear-gradient(135deg, #00ACC1, #00BCD4)',    // 10°F - 20°F
    20: 'linear-gradient(135deg, #00BCD4, #26C6DA)',    // 20°F - 30°F
    30: 'linear-gradient(135deg, #26C6DA, #4DD0E1)',    // 30°F - 40°F
    40: 'linear-gradient(135deg, #4DD0E1, #80DEEA)',    // 40°F - 50°F
    50: 'linear-gradient(135deg, #80DEEA, #B2EBF2)',    // 50°F - 60°F
    60: 'linear-gradient(135deg, #FFEE58, #FFD54F)',    // 60°F - 70°F
    70: 'linear-gradient(135deg, #FFD54F, #FFB74D)',    // 70°F - 80°F
    80: 'linear-gradient(135deg, #FFB74D, #FF8A65)',    // 80°F - 90°F
    90: 'linear-gradient(135deg, #FF8A65, #FF7043)',    // 90°F - 100°F
    100: 'linear-gradient(135deg, #FF7043, #FF5722)',   // 100°F - 110°F
    110: 'linear-gradient(135deg, #FF5722, #F4511E)',   // 110°F - 120°F
    120: 'linear-gradient(135deg, #F4511E, #E64A19)',   // 120°F - 130°F
    130: 'linear-gradient(135deg, #E64A19, #D84315)',   // 130°F - 140°F
    140: 'linear-gradient(135deg, #D84315, #BF360C)',   // 140°F - 150°F
};

let weatherLocation = 'New York, NY'
let weather;

async function buildWeather(weatherLocation) {
    try {
        weather = new Weather(weatherLocation);
        await weather.getWeatherJSON();
        const weatherInfo = weather.getWeatherInfo();
        locationDOM.innerText = weatherInfo.location;
        buildWeatherHelper('now', weatherInfo, weatherContainerNow);
        buildWeatherHelper('today', weatherInfo, weatherContainerToday);
        buildWeatherHelper('tomorrow', weatherInfo, weatherContainerTomorrow);
        buildWeatherHelper('next', weatherInfo, weatherContainerNext)
    } catch (err) {
        locationDOM.innerText = `Can't get weather for ${weatherLocation}.`;
    }
}

function buildWeatherHelper(day, weatherInfo, container) {
    const weatherDOM = container.querySelector('.weather');
    const tempDOM = container.querySelector('.temp');
    const iconDOM = container.querySelector('.icon')
    weatherDOM.innerText = weatherInfo[day].condition;
    const nowTemp = weatherInfo[day].temp;
    tempDOM.innerText = `${Math.round(nowTemp)}`;
    tempDOM.classList.add('f');
    fButton.classList.add('active');
    tempDOM.classList.remove('c');
    cButton.classList.remove('active');
    const roundedTemp = Math.floor(nowTemp / 10) * 10;
    pageBody.style["background-image"] = tempColors[roundedTemp];
    const icon = weatherInfo[day].icon;
    iconDOM.innerHTML = `<img src="${weatherIcons[icon]}" alt="${icon}">`;
}

function switchFC(tempDOM) {
    const fTemp = tempDOM.innerText;
    const celsius = (fTemp - 32) * (5/9);
    tempDOM.innerText = Math.round(celsius);
    tempDOM.classList.toggle('f')
    tempDOM.classList.toggle('c')
}

function switchCF(tempDOM) {
    const cTemp = tempDOM.innerText;
    const fahrenheit = (cTemp * (9/5)) + 32;
    tempDOM.innerText = Math.round(fahrenheit);
    tempDOM.classList.toggle('f')
    tempDOM.classList.toggle('c')
}

buildWeather(weatherLocation);

tempSwitch.addEventListener("click", (button) => {
    if (
        button.target === fButton &&
        !button.target.classList.value.includes('active')
    ) {
        button.stopPropagation()
        button.target.classList.toggle('active');
        cButton.classList.toggle('active');
        let allTempDOMS = document.querySelectorAll('.temp');
        allTempDOMS = Array.from(allTempDOMS);
        for (const DOM in allTempDOMS) {
            switchCF(allTempDOMS[DOM])
        }
    } else if (
        button.target === cButton &&
        !button.target.classList.value.includes('active')
    ) {
        button.stopPropagation()
        button.target.classList.toggle('active');
        fButton.classList.toggle('active');
        let allTempDOMS = document.querySelectorAll('.temp');
        allTempDOMS = Array.from(allTempDOMS);
        for (const DOM in allTempDOMS) {
            switchFC(allTempDOMS[DOM])
        }
    }
})

weatherSearch.addEventListener("submit", (submit) =>{
    submit.preventDefault();
    weatherLocation = weatherSearchInput.value;
    buildWeather(weatherLocation);
    weatherSearchInput.value = '';
})