import React, { Component } from "react";
import ResultContainer from "./ResultContainer";
import Form from "./Form";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

export default class Content extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data, handleSubmit } = this.props;
    return (
      <div id="content">
        <Form handleSubmit={handleSubmit} />
        <div id="result">
          {Object.keys(data).length !== 0 ? (
            <ResultContainer data={data} />
          ) : (
            <Loader type="Oval" color="teal" height={80} width={80} />
          )}
        </div>
      </div>
    );
  }
}
