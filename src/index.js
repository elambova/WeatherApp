import React from "react";
import ReactDOM from "react-dom";
import "./styles/reset.scss";
import "./styles/style.scss";
import App from "./App";

export const renderDOM = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};
renderDOM();
