import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ResultContainer extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;
    const date = new Date().toDateString();

    return (
      <React.Fragment>
        <h2>{data.city} </h2>
        <h3 className="date">{date}</h3>

        <img
          src={
            data.weather.icon !== undefined
              ? `https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png`
              : `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          }
          alt={`${data.weather.description}`}
        />
        <p>{data.weather.description}</p>
        <p>
          Temperature: <strong>{data.temp}</strong> &#8451;
        </p>
        <img
          id="city-pic"
          src={`${data.picture}`}
          alt={`${data.city}, ${data.country}`}
        />
        <p className="tags-image">{data.tags}</p>
      </React.Fragment>
    );
  }
}
