import { createUrlImg, drawMap } from "./map";

import * as mockedUrl from "./map";

jest.mock("./map");

describe("createUrlImg", () => {
  it("createUrlImg", () => {
    const mock = mockedUrl.createUrlImg.mockImplementation(
      () =>
        `https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`
    );
    const UrlUmg = createUrlImg(mock);
    expect(UrlUmg).toEqual(
      "https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk"
    );
    expect(mock).toHaveBeenCalled();
    expect(createUrlImg).toHaveBeenCalled();
    expect(createUrlImg()).toBe(
      "https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk"
    );
  });
});

describe("createUrlImgCalled", () => {
  global.window.document.body.innerHTML = `<div id="container"></div>
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
  <img class="img" />`;
});

const img = document.querySelector(".img");
it("drawMap", async () => {
  const result = `https`;
  const data = await drawMap(img, result);
  expect(data).not.toBe("");
});
