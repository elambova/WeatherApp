import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Content from "../Components/Content";
import Form from "../Components/Form";
import Adapter from "enzyme-adapter-react-16";
import ResultContainer from "../Components/ResultContainer";
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });
let content;

const handleSubmit = () => {
  return "SUBMIT";
};

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

beforeEach(() => {
  content = mount(<Content data={data} handleSubmit={handleSubmit} />);
});

describe("App container", () => {
  test("should be exists", () => {
    expect(content.exists()).toBe(true);
  });

  test("render Form Container", () => {
    const formContainer = mount(<Form handleSubmit={handleSubmit} />);
    expect(formContainer.props()).toMatchSnapshot();
  });

  test("render Result Container", () => {
    const resultContainer = mount(<ResultContainer data={data} />);

    expect(resultContainer.props("data")).toMatchSnapshot();
  });

  test("Form Container simulate submit", () => {
    const formContainer = mount(<Form handleSubmit={handleSubmit} />);
    formContainer.simulate("submit");
    expect(formContainer.prop("handleSubmit")()).toBe("SUBMIT");
  });

  test("check in Result Container data.city is Sofia", () => {
    const resultContainer = mount(<ResultContainer data={data} />);

    expect(resultContainer.props("data").data.city).toBe("Sofia");
  });

  test("renders without crashing given the required props", () => {
    const form = shallow(<Form handleSubmit={handleSubmit} />);

    expect(toJson(form)).toMatchSnapshot();
  });

  test("required props type Function", () => {
    const form = shallow(<Form handleSubmit={handleSubmit} />);

    expect(toJson(form).node.nodeType).toBe("function");
  });
});
