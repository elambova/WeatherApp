const connectAPI = require("../ConnectAPI/ConnectAPI");
const fetchMock = require("fetch-mock");

describe("Connect API", () => {
  beforeAll(() => {
    fetchMock.get("*", {
      city: "Sofia",
      country: "Bulgaria",
      lat: "42.69751",
      tags: "sofia",
    });
  });

  test("should be defined", () => {
    expect(connectAPI).toBeDefined();
  });

  test("should return data for city", async () => {
    expect.assertions(1);
    return connectAPI
      .getInfo("Sofia")
      .then((data) => expect(data.city).toEqual("Sofia"))
      .catch((error) => console.log(error));
  });

  test("should return data for country", async () => {
    expect.assertions(1);
    return connectAPI
      .getInfo("Sofia")
      .then((data) => expect(data.country).toEqual("Bulgaria"))
      .catch((error) => console.log(error));
  });

  test("should return data lat to be equal", async () => {
    expect.assertions(1);
    return connectAPI
      .getInfo("Sofia")
      .then((data) => expect(data.lat).toEqual("42.69751"))
      .catch((error) => console.log(error));
  });

  test("should return data tags to be equal", async () => {
    expect.assertions(1);
    return connectAPI
      .getInfo("Sofia")
      .then((data) => expect(data.tags).toMatch(/sofia/))
      .catch((error) => console.log(error));
  });
});
