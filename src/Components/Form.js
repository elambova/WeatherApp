import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Form extends Component {
  state = {
    city: "",
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    if (this.props.handleSubmit) {
      this.props.handleSubmit(this.state.city);
    }
  };
  render() {
    return (
      <React.Fragment>
        <form method="POST" onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="city">Please enter city:</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              onChange={(e) => this.setState({ city: e.target.value })}
              required
            />
          </div>
          <input type="submit" id="submit-btn" value="Enter" name="submit" />
        </form>
      </React.Fragment>
    );
  }
}
