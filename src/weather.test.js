import {
  getWeather,
  getCityName,
  drawCity
} from "./weather";
import * as testConstants from "./constants";

describe("getWeather", () => {
  it("return weather", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testWeather)
      })
    );
    const weather = await getWeather();
    expect(weather).toEqual(2)
  });
});

describe("getCityName", () => {
  it("return CityName", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testConstants.testCity)
      })
    );
    const city = await getCityName();
    expect(city).toEqual("Abaza")
  });
  it("return err CityName", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(
        Error())
    );
    const city = await getCityName();
    expect(city).toEqual("город не найден")
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
<img class="img">`
const div = document.querySelector("#container");

it('Draw City test', async () => {
expect(div).not.toBe(null);
await drawCity();
drawCity.mockImplementation(()=> {div.innerHTML="novosibirsk"})
expect('#container'.innerHTML()).toEqual();
});
});