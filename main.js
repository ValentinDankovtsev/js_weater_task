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

(async function bundle() {
  const city = await getCityName();
  const data = getWeather(city);
  drawWeather(document.querySelector(".container2"), (await data).tempmin);
  drawIcon(document.querySelector(".container3"), getUrlIcon(city));
  drawCity(document.querySelector(".container"), city);
  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = createUrlImg(city))
  );
})();

const formEl = document.querySelector("form");
const listEl = document.querySelector(".list");

const items = readList();

drawList(listEl, items);

formEl.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formElement = ev.target;
  const inputEl = formElement.querySelector("input");
  const cityName = inputEl.value;
  inputEl.value = "";

  const weather = await getWeather(cityName);
  drawWeather(document.querySelector(".container2"), weather.tempmin);
  drawIcon(document.querySelector(".container3"), getUrlIcon(cityName));
  const map = createUrlImg(cityName);
  drawMap(
    document.querySelector(".img"),
    (document.querySelector(".img").src = map)
  );

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
      drawIcon(document.querySelector(".container3"), getUrlIcon(city));
      drawWeather(document.querySelector(".container2"), weather.tempmin);
      drawMap(
        document.querySelector(".img"),
        (document.querySelector(".img").src = map)
      );
    }
  }
});
