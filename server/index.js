var path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

//middleware
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.static("dist"));

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

const fetch = require("node-fetch");

app.get("/", function (req, res) {
  // for production
  res.sendFile("build/index.html");

  // for development
  // res.sendFile(path.resolve("public/index.html"));
});

// designates what port the app will listen to for incoming requests
let port = process.env.PORT || 8080;

// Spin up th server
app.listen(port, listening);

// Callback function for listen, initialize in console that the server is running and the contents of localhost:8080
function listening() {
  console.log(`Server is running on localhost:${port}`);
}

// Keys for access to APIs
const keys = {
  geoUserName: process.env.GEO_USERNAME,
  weatherbitKey: process.env.WEATHERBIT_API_KEY,
  openweathermapKey: process.env.OPENWEATHER_API_KEY,
  pixabayKey: process.env.PIXABAY_API_KEY,
};

// Connect to Geonames Api
const geonamesApiConnect = async (city) => {
  const location = await fetch(
    `http://api.geonames.org/searchJSON?q=${city}&username=${keys.geoUserName}`
  );
  try {
    const dataLocation = await location.json();
    return dataLocation.geonames[0];
  } catch (error) {
    console.log(error);
  }
};

// Connect to Weather Api
const weatherbitApiConnect = async (lat, lng) => {
  const weather = await fetch(
    `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${keys.weatherbitKey}`
  );

  try {
    const weatherData = await weather.json();
    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

// Connect to Weather Api
const openweatherApiConnect = async (lat, lng) => {
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${keys.openweathermapKey}`
  );

  try {
    const weatherData = await weather.json();

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

// Connect to Pixabay Api
const pixabayApiConnect = async (city, country) => {
  let pixabay =
    city === undefined
      ? await fetch(
          `https://pixabay.com/api/?key=${keys.pixabayKey}&q=${country}&image_type=photo&pretty=true`
        )
      : await fetch(
          `https://pixabay.com/api/?key=${keys.pixabayKey}&q=${city}+${country}&image_type=photo&pretty=true`
        );

  try {
    const pixabayData = await pixabay.json();
    return pixabayData;
  } catch (error) {
    console.log(error);
  }
};

// Connect to Location Api
const locationsAPi = async () => {
  let location = await fetch("https://json.geoiplookup.io/");
  try {
    const locationData = await location.json();
    return locationData;
  } catch (error) {
    console.log(error);
  }
};

// GET route who connect to all 3 APIs and return data
app.get("/getInfo", async (req, res, next) => {
  try {
    const geonames = await geonamesApiConnect(req.query.city);
    const weatherbit = await weatherbitApiConnect(geonames.lat, geonames.lng);
    const openweather = await openweatherApiConnect(geonames.lat, geonames.lng);
    const pixabay = await pixabayApiConnect(
      req.query.city,
      geonames.countryName
    );
    const data = {
      city: geonames.name,
      lat: geonames.lat,
      long: geonames.lng,
      country: geonames.countryName,
      picture: pixabay.hits[0].webformatURL,
      tags: pixabay.hits[0].tags,
      id: new Date().valueOf(),
      city: geonames.name,
      country: geonames.countryName,
      picture: pixabay.hits[0].webformatURL,
      id: new Date().valueOf(),
      ...(weatherbit !== undefined
        ? {
            weather: weatherbit[0].weather,
            temp: weatherbit[0].temp.toFixed(1),
            city_name: weatherbit[0].city_name,
          }
        : {
            weather: openweather[0].weather,
            temp: openweather[0].main.temp.toFixed(1),
            city_name: openweather[0].name,
          }),
    };
    res.send({ ...data });
  } catch (error) {
    console.log(error);
  }
});

// GET Route return data from user IP address
app.get("/loadData", async (req, res, next) => {
  try {
    const location = await locationsAPi();
    const lat = location.latitude;
    const lon = location.longitude;
    const weatherbit = await weatherbitApiConnect(lat, lon);
    const openweather = await openweatherApiConnect(lat, lon);
    const pixabay = await pixabayApiConnect(
      location.city,
      location.country_name
    );

    const data = {
      city: location.city,
      country: location.country_name,
      picture: pixabay.hits[0].webformatURL,
      tags: pixabay.hits[0].tags,
      id: new Date().valueOf(),
      ...(weatherbit !== undefined
        ? {
            weather: weatherbit[0].weather,
            temp: weatherbit[0].temp.toFixed(1),
            city_name: weatherbit[0].city_name,
          }
        : {
            weather: openweather.weather,
            temp: openweather.main.temp.toFixed(1),
            city_name: openweather.name,
          }),
      city_name: location.city,
      lat: lat,
      long: lon,
      tags: pixabay.hits[0].tags,
    };
    res.send({ ...data });
  } catch (error) {
    console.error(error);
  }
});

// export app
module.exports = app;
