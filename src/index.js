import "./styles.css";

const pageBody = document.querySelector("body");
const helloWorld = document.createElement("p");

helloWorld.innerText = "Hello, world!";

pageBody.appendChild(helloWorld);
