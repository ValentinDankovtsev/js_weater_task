import {createUrlImg} from "./map"

import * as  mockedUrl from "./map";

jest.mock('./map')

describe("createUrlImg", () => {
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


    it("createUrlImg",   () => {
        const mock = mockedUrl.createUrlImg.mockImplementation(()=> {return `https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`});
        const UrlUmg = createUrlImg();
        expect(UrlUmg).toEqual("https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk")
        expect(mock).toHaveBeenCalled()
        expect(createUrlImg()).toHaveBeenCalled()
        
    })
});