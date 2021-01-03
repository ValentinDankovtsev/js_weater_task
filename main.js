import {
    getCityName,
    drawCity,
    getWeather,
    drawWeather,
    getUrlIcon,
    drawIcon,
} from "./src/weather";
import {
    createUrlImg,
    drawMap,

    // createUrlImg
} from "./src/map"

(async function () {
    const city = await getCityName()
    drawWeather(document.querySelector("#container2"), getWeather(city))
    drawIcon(document.querySelector("#container3"), getUrlIcon(city));
    drawCity(document.querySelector("#container"), city);
    drawMap(document.querySelector(".img"), document.querySelector(".img").src=createUrlImg());
})();

// drawImg();

(async function formwithWeatherInfoStorage() {
    const formEl = document.querySelector("form");
    const weatherInfoEl = document.querySelector("#weatherInfo");
    const listEl = document.querySelector("#list");


    function showWeather(el, weatherInfo) {
        el.innerHTML = JSON.stringify(weatherInfo);
    }

    async function getWeatherForm(cityName) {
        const weather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=4bbb391332a42b41e526d937af5bb440`
        ).then((response) => response.json());
        return weather.main.temp;
    }

    async function readList() {
        const list = JSON.parse(localStorage.getItem("items"));
        if (list === null) {
            return [];
        }
        return list;
    }

    function saveList(items) {
        localStorage.setItem("items", JSON.stringify(items));
    }

    function drawList(el, items) {
        el.innerHTML = `<ol>${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
    }

    const items = await readList();

    drawList(listEl, items);

    formEl.addEventListener("submit", async (ev) => {
        // чтобы не перезагружать страницу
        ev.preventDefault();

        // читаем значение из формы
        const formElement = ev.target;
        const inputEl = formElement.querySelector("input");
        const cityName = inputEl.value;
        inputEl.value = "";

        const weather = await getWeatherForm(cityName);
        showWeather(weatherInfoEl, weather);

        const map = createUrlImg(cityName);
        drawMap(document.querySelector(".img"),document.querySelector(".img").src= map)

        items.push(cityName);


        while (items.length > 10) {
            items.shift();
        }

        drawList(listEl, items);

        // сохраняем список
        saveList(items);
    });

    const ol = document.querySelector("ol");

    ol.addEventListener("click", async (event) => {
        event.preventDefault();
        if (event.target.matches("li")) {
            const city = event.target.innerText;
            const weather = await getWeatherForm(city)
            const map = createUrlImg(city);
            if (weather) {
                showWeather(weatherInfoEl, weather)
                drawMap(document.querySelector(".img"),document.querySelector(".img").src= map)
            }
        }
    });
})();