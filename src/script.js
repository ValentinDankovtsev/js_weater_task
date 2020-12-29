async function getCityName() {
    try {
        const result = await fetch(`https://get.geojs.io/v1/ip/geo.json`)
            .then(response => response.json()).then(data => data.city);
        return result;
        
    } catch (err) {
        alert('ошибка');
    }
}


async function drawCity(el, result) {
    el.innerHTML = await result;
}


async function getWeather(result) {
    const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${result}&appid=d26008b5ef954ff8cd8cdefb3d851e73`).then(response => response.json());
    return weather.main.temp_min;
}
async function drawWeather(el, result) {
    el.innerHTML = await result;
}
async function getIconWeatherFromApi(city) {
    const weatherIconId = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=d26008b5ef954ff8cd8cdefb3d851e73`).then(response => response.json());
    return weatherIconId.weather[0].icon;
}

async function getUrlIcon(city) {
    const iconName = await getIconWeatherFromApi(city);
    const icon = `<img src="https://openweathermap.org/img/wn/${iconName}@2x.png">`;

    return icon;
}

async function drawIcon(el, result) {
    el.innerHTML = await result;
}

(async function () {
    const city = await getCityName()
    drawWeather(document.querySelector("#container2"), getWeather(city))
    drawIcon(document.querySelector("#container3"), getUrlIcon(city));
    drawCity(document.querySelector("#container"), city);
}) ();


 function createUrlImg(result) {
    // const city =  getCityName();
    const city = result
    const imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${city}&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`;
    return imgUrl;
}

function drawImg() {
    document.querySelector('img').src = createUrlImg(); 
}
drawImg() ;



(async function () {
    const formEl = document.querySelector("form");
    const weatherInfoEl = document.querySelector("#weatherInfo");
    const listEl = document.querySelector("#list");
    const liEl = document.querySelectorAll("li");

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
        if ([el.querySelectorAll("li")].length > 9) { //  список выводится до 10 элементов li, удаляется первый элемент при добавлении сверх. названия городов в списке не повоторяются
            el.removeChild(el.querySelectorAll("li")[0]);
        }
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

        items.push(cityName);

        // обновляем список
        drawList(listEl, items);

        // сохраняем список
        saveList(items);
        // createUrlImg(cityName);
        // document.querySelector('img').src = createUrlImg(); 

    });
    
    liEl.addEventListener("click", showWeather);
    //   повесить обработчик на список,чтобы показывала темперутуру
    //    и google static map соответствующего города
})();