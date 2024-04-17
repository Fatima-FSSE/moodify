import React, { useState, useEffect } from "react";
import "./WeatherBar.css";
import searchImg from "../Assets/WeatherBarAssets/search.png";
import humidityImg from "../Assets/WeatherBarAssets/humidity.png";
import windyImg from "../Assets/WeatherBarAssets/windy.png";
import uvIndexImg from "../Assets/WeatherBarAssets/uv-index.png";
import precipitationImg from "../Assets/WeatherBarAssets/precipitation.png";
import visibilityImg from "../Assets/WeatherBarAssets/visibility.png";
import tempratureImg from "../Assets/WeatherBarAssets/temprature.png";
import logo from "../Assets/moodify.png";

function WeatherBar() {
  const [inputValue, setInputValue] = useState("Sugar Land");
  const [temprature, setTemprature] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [uvIndex, setUvIndex] = useState();
  const [visiblity, setVisibility] = useState();

  useEffect(() => {
    console.log("inside the useEffect");
    //getWeatherData(inputValue);
  }, []);

  async function getWeatherData(input) {
    
    let url = `https://api.weatherbit.io/v2.0/current?city=${input}&key=${api_key}&include=hourly&units=I`;
    let response = await fetch(url);
    let weatherData = await response.json();

    const wIcon = require(`../Assets/WeatherBarAssets/weather-icons/${weatherData.data[0].weather.icon}.png`);
    document.getElementById("icon").src = wIcon;

    setTemprature(Math.floor(weatherData.data[0].temp));
    setHumidity(Math.floor(weatherData.data[0].rh));
    setWindSpeed(Math.floor(weatherData.data[0].wind_spd));
    setFeelsLike(Math.floor(weatherData.data[0].app_temp));
    setUvIndex(Math.floor(weatherData.data[0].uv));
    setWeatherDesc(weatherData.data[0].weather.description);
    setVisibility(weatherData.data[0].vis);
  }

  function search() {
    const cityName = document.getElementsByClassName("search-city");
    setInputValue(cityName[0].value);
    //getWeatherData(cityName[0].value);
  }

  return (
    <div className="weather-bar-container">
      <div className="container">
        <div>
          <img className="logo-icon" src={logo} alt="logo" />
        </div>
        <div className="search-bar">
          <input
            type="text"
            className="search-city"
            placeholder="search city"
          />
          <img
            className="search-img"
            src={searchImg}
            alt="seach Icon"
            onClick={search}
          />
        </div>
      </div>
      <div className="weather-div">
        <div className="temprature-div">
          <img className="weather-icon" id="icon" alt="weather forecast" />
          <div className="weather-desc">
            <div className="desc heading">{weatherDesc}</div>
          </div>
          <div className="city-temp-div">
            <div className="city-temp heading">{temprature}&#176;F</div>
            <div className="city-name heading">
              {inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase()}
            </div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={humidityImg}
            alt="weather forecast"
          />
          <div className="humidity-text">
            <div className="humidity-value heading">{humidity} %</div>
            <div className="heading">Humidity</div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={windyImg}
            alt="weather forecast"
          />
          <div className="wind-text">
            <div className="windSpeed-value heading">{windSpeed} m/s</div>
            <div className="heading">Wind speed</div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={uvIndexImg}
            alt="weather forecast"
          />
          <div className="uvIndex-text">
            <div className="uvIndex-value heading">{uvIndex}</div>
            <div className="heading">UV INDEX</div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={precipitationImg}
            alt="weather forecast"
          />
          <div className="uvIndex-text">
            <div className="precipitation-value heading">0 mm/h</div>
            <div className="heading">Precipitation</div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={visibilityImg}
            alt="weather forecast"
          />
          <div className="visibility-text">
            <div className="visibility-value heading">{visiblity} km</div>
            <div className="heading">Visibility</div>
          </div>
        </div>
        <div className="forecast-div">
          <img
            className="forecast-icon"
            src={tempratureImg}
            alt="weather forecast"
          />
          <div className="feelsLike-text">
            <div className="feelsLike-value heading">{feelsLike}&#176;F</div>
            <div className="heading">Feels like</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBar;
