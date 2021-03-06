import {
  getCityName,
  drawCity,
  getWeather,
  drawWeather,
  getUrlIcon,
  drawIcon,
} from "./src/weather";
import { createUrlImg, drawMap } from "./src/map";
import { readList, saveList, drawList } from "./src/storage";
import "./style.css";

(async function bundle() {
  const city = await getCityName();
  const data = getWeather(city);
  drawWeather(document.querySelector(".city"), (await data).tempmin);
  drawIcon(document.querySelector(".icon"), getUrlIcon(city));
  drawCity(document.querySelector(".temp"), city);
  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = createUrlImg(city))
  );
})();

const formEl = document.querySelector("form");
const listEl = document.querySelector(".list");
const imgEl = document.querySelector(".img");

const items = readList();

drawList(listEl, items);

formEl.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formElement = ev.target;
  const inputEl = formElement.querySelector("input");
  const cityName = inputEl.value;
  inputEl.value = "";

  const weather = await getWeather(cityName);
  drawWeather(document.querySelector(".temp"), weather.tempmin);
  drawIcon(document.querySelector(".icon"), getUrlIcon(cityName));
  const map = createUrlImg(cityName);
  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );
  drawCity(document.querySelector(".city"), cityName);
  if (!items.includes(cityName)) {
    items.push(cityName);
  }

  while (items.length > 10) {
    items.shift();
  }

  drawList(listEl, items);

  saveList(items);
});

listEl.addEventListener("click", async (event) => {
  if (event.target.matches("li")) {
    const city = event.target.innerText;
    const weather = await getWeather(city);
    const map = createUrlImg(city);
    if (weather) {
      drawIcon(document.querySelector(".icon"), getUrlIcon(city));
      drawWeather(document.querySelector(".temp"), weather.tempmin);
      drawMap(imgEl, (imgEl.src = map));
      drawCity(document.querySelector(".city"), city);
    }
  }
});
