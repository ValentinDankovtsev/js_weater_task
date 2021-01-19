import { createUrlImg} from "./map";

import * as mockedUrl from "./map";

jest.mock("./map");

describe("createUrlImg", () => {
  it("createUrlImg", async () => {
    const mock = mockedUrl.createUrlImg.mockImplementation(
      () =>
        `https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk`
    );
    const urlUmg = createUrlImg(mock);
    expect(urlUmg).toEqual(
      "https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk"
    );
    expect(mock).toHaveBeenCalled();
    expect(createUrlImg).toHaveBeenCalled();
    expect(createUrlImg()).toBe(
      "https://maps.googleapis.com/maps/api/staticmap?center=Novosibirsk&size=400x400&key=AIzaSyD-rF50V7U1jPQM_ZlgK_XlCJMtF5_xuSk"
    );
  });
});
  



