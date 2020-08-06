import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import ResultContainer from "../Components/ResultContainer";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

const data = {
  city: "Sofia",
  country: "Bulgaria",
  picture:
    "https://pixabay.com/get/54e2d3474c54ad14f1dc84609629317f123cd9e4574c704c7c297ad49449c250_640.jpg",

  weather: {
    icon: "c01d",
    description: "Clear sky",
  },
};

describe("result container", () => {
  test("should be exists", () => {
    const resultContainer = shallow(<ResultContainer data={data} />);

    expect(resultContainer.exists()).toBe(true);
  });

  test("render", () => {
    const resultContainer = shallow(<ResultContainer data={data} />);

    expect(resultContainer).toMatchSnapshot();
  });

  test("renders without crashing given the required props", () => {
    const resultContainer = shallow(<ResultContainer data={data} />);

    expect(toJson(resultContainer)).toMatchSnapshot();
  });

  test("required props type Object", () => {
    const resultContainer = shallow(<ResultContainer data={data} />);

    expect(typeof toJson(resultContainer).children[0].props).toBe("object");
  });
});
