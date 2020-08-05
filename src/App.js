import React, { Component } from "react";
import Content from "./Components/Content";
import * as ConnectAPI from "./ConnectAPI/ConnectAPI";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    window.addEventListener("load", this.location);
  }

  handleSubmit = async (city) => {
    this.setState({ data: {} });
    const data = await ConnectAPI.getInfo(city);
    this.setState({ data });
  };

  location = () => {
    ConnectAPI.loadData()
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <header id="header">
          <h1>Weather App</h1>
        </header>
        <Content
          handleSubmit={this.handleSubmit}
          data={this.state.data}
          onLoad={() => this.location()}
        />
        <footer id="footer">
          <p>Copyright &copy;</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
