import "./styles.css";
import { Weather } from "./weather";

const pageBody = document.querySelector("body");
const helloWorld = document.createElement("p");

helloWorld.innerText = "Hello, world!";

pageBody.appendChild(helloWorld);

const weather = new Weather('lynchburg,va');

weather.getTodaysWeather().then(result => helloWorld.innerText = result)

