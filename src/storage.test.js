import { saveList, readList } from "./storage";

describe("mock localStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Save localStorage", async () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, "setItem");
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.setItem = jest.fn();
    const key = "items";
    const list = [];
    const value = JSON.stringify(list);
    saveList(list);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
  it("should get [] from empty localStorage", () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, "getItem");
    // eslint-disable-next-line no-proto
    window.localStorage.__proto__.setItem = jest.fn();
    const key = "items";
    const list = readList();
    expect(global.localStorage.getItem).toHaveBeenLastCalledWith(key);
    expect(list).toStrictEqual([]);
  });
});
