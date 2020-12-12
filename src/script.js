function drawWeather(el) {
  let result = "";
  result = `<div><img src="http://openweathermap.org/img/wn/10d@2x.png"></div>`;

  el.innerHTML = result;
}

drawWeather(document.querySelector("#container"));

function drawMap(el) {
  let result = "";
  result = `<div><img src="https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=AIzaSyClJ2PFwQAo__WwikdIFLaVk7Xn-jdXmeI" async defer></img></div>`;

  el.innerHTML = result;
}

drawMap(document.querySelector("#container2"));

(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");

  function showWeather(el, weatherInfo) {
    el.innerHTML = JSON.stringify(weatherInfo, null, 2);
  }

  /**
   * Функция должна делать запрос на
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   * где
   *  {{CITY_NAME}} должен быть заменен на имя города
   *  {{APP_ID}} должен быть заменен на ключ приложения
   * Запрос возвращает данные в формате JSON
   *
   * функция должна возвращать (Promise) данные с информацией о погоде
   */
  async function getWeather(cityName) {
    const weather = fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=4bbb391332a42b41e526d937af5bb440`
    );
    return (await weather).json();
  }

  async function getUserCity() {
    const url = `https://get.geojs.io/v1/ip/geo.json`;
    const response = await fetch(url);
    const json = await response.json();
    return json.city;
  }
  formEl.addEventListener("submit", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const inputEl = formElement.querySelector("input");
    const cityName = inputEl.value;
    inputEl.value = "";

    const weather = await getWeather(cityName);
    showWeather(weatherInfoEl, weather);
  });

  const userCity = await getUserCity();
  const userWeather = await getWeather(userCity);
  showWeather(weatherInfoEl, userWeather);
})();