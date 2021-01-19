/* eslint-disable prefer-destructuring */
/* eslint-disable no-return-assign */
import {
  getWeather,
  getCityName,
  drawCity,
  getUrlIcon,
  drawIcon,
  drawWeather,
} from "./weather";
import { drawMap} from "./map";
import { drawList } from "./storage";
import * as testConstants from "./constants";
import * as module from "./storage";
import * as moduleMap from "./map";

describe("getWeather", () => {
  it("return weather", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testWeather),
      })
    );
    const weather = await getWeather();
    expect(weather).toEqual({ icon: "04d", tempmin: 2 });
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

describe("drawFunctions with html", () => {
  global.window.document.body.innerHTML = `
<div class="city"></div>
<div class="temp"></div>
<div class="icon"></div>
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
<div class="list"></div>
<img class="img">`;
  const div = document.querySelector(".city");
  const div2 = document.querySelector(".temp");
  const list = document.querySelector(".list");
  const imgIcon = document
    .querySelector(".icon")
    .getElementsByTagName("img");
  // const button = document.querySelector('button')
  it("drawCity", async () => {
    await drawCity(div, testConstants.testCity.city);
    expect(div).not.toBe(null);
    expect(div.innerHTML).toEqual("City: Abaza");
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
  
it("drawMap", async () => {
  const img = document.querySelector(".img");
  moduleMap.drawMap = jest.fn(()=> (img.src =  `https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk` ))
  await drawMap();
  expect(img.src).not.toBe(null);
  expect(img.src).toBe("https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk")
});
  it("drawList", async () => {
    // eslint-disable-next-line global-require
    // const foo = require('./storage.js');
    // foo.drawList.mockImplementation(()=> 42);
    // foo()

    // eslint-disable-next-line global-require
    require("./storage.js");
    module.drawList = jest.fn(
      () => (list.innerHTML = testConstants.TEST_CYTY[0])
    );
    await drawList();
    expect(list).not.toBe("");
    expect(list.innerHTML).toEqual("moscow");
    expect(drawList()).toBe("moscow");
  });
  // it ("button test", async ()=> {
  //   expect(button).not.toBe(null)
  //   require('../main')
  //   module.getWeather = jest.fn()
  //   getWeather()
  //   button.dispatchEvent( new Event ("click"));
  //   expect(getWeather).toHaveBeenCalled()
  //   expect(module.getWeather.mock).toBeTruthy();

  // // })
});
