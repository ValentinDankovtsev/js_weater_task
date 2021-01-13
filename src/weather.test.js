import {
  getWeather,
  getCityName,
  drawCity,
  getIconWeatherFromApi,
  getUrlIcon,
  drawIcon,
  drawWeather,
} from "./weather";
import * as testConstants from "./constants";

describe("getWeather", () => {
  it("return weather", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testWeather),
      })
    );
    const weather = await getWeather();
    expect(weather).toEqual(2);
  });
});

describe("getCityName", () => {
  it("return CityName", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testCity),
      })
    );
    const city = await getCityName();
    expect(city).toEqual("Abaza");
  });
  it("return err CityName", async () => {
    global.fetch = jest.fn(() => Promise.reject(Error()));
    const city = await getCityName();
    expect(city).toEqual("город не найден");
  });
});

describe("getIconWeatherFromApi", () => {
  it("return getIconWeatherFromApi", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testWeather),
      })
    );
    const icon = await getIconWeatherFromApi();
    expect(icon).toEqual("04d");
  });
});

describe("getUrlIcon", () => {
  it("return url getUrlIcon", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testWeather),
      })
    );
    const icon = await getUrlIcon();
    expect(icon).toEqual(
      '<img src="https://openweathermap.org/img/wn/04d@2x.png">'
    );
  });
});

describe("DrawCity", () => {
  global.window.document.body.innerHTML = `
<div id="container"></div>
<div id="container2"></div>
<div id="container3"></div>
 <form>
  <input
    id="userInput"
    placeholder="Type city and press enter"
    required
    autofocus
  />
  <button>Get weather</button>
</form>
<pre id="weatherInfo"></pre>
<div id="list"></div>
<img class="img">`;
  const div = document.querySelector("#container");
  const div2 = document.querySelector("#container2");
  const imgIcon = document
    .querySelector("#container3")
    .getElementsByTagName("img");

  it("drawCity", async () => {
    await drawCity(div, testConstants.testCity.city);
    expect(div).not.toBe(null);
    expect(div.innerHTML).toEqual("Your City: Abaza");
  });
  it("drawIcon", async () => {
    const result = `https://openweathermap.org/img/wn/04d@2x.png`;
    await drawIcon(imgIcon, result);
    expect(imgIcon.src).not.toBe("");
    expect(imgIcon).not.toBe(null);
    expect(imgIcon.innerHTML).toEqual(
      "https://openweathermap.org/img/wn/04d@2x.png"
    );
  });
  it("drawWeather", async () => {
    await drawWeather(div2, testConstants.testWeather.main.temp);
    expect(div2).not.toBe("");
    expect(div2).not.toBe(null);
    expect(div2.innerHTML).toEqual("Temperature °C: 2.15");
  });
});
