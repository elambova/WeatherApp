import React from "react";
import Enzyme, { mount } from "enzyme";
import App from "../App";
import Content from "../Components/Content";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
let app;

beforeEach(() => {
  app = mount(<App />);
});
describe("App container", () => {
  test("should be exists", () => {
    expect(app.exists()).toBe(true);
  });

  test("contents header", () => {
    expect(app.find("header")).toHaveLength(1);
  });

  test("contents Content component", () => {
    expect(app.find(Content)).toHaveLength(1);
  });

  test("contents form in Content component", () => {
    expect(app.find("form")).toHaveLength(1);
  });

  test("contents footer", () => {
    expect(app.find("footer")).toHaveLength(1);
  });
});
