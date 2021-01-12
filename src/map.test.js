import { createUrlImg } from "./map";

import * as mockedUrl from "./map";

jest.mock("./map");

describe("createUrlImg", () => {
  it("createUrlImg", () => {
    const mock = mockedUrl.createUrlImg.mockImplementation(
      () =>
        `https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`
    );
    const UrlUmg = createUrlImg();
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
  it("createUrlImg is called", () => {});
});
