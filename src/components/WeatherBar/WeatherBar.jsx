import React, { useState, useEffect } from "react";
import "./WeatherBar.css";

function WeatherBar() {
  const [inputValue, setInputValue] = useState("Sugar Land");
  const [temprature, setTemprature] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [uvIndex, setUvIndex] = useState();
  const [visiblity, setVisibility] = useState();
  const [isResponse, setIsResponse] = useState(true);

  const path = "images/WeatherBarAssets/";
  const searchImg = `${path}search.png`;
  const humidityImg = `${path}humidity.png`;
  const windyImg = `${path}windy.png`;
  const uvIndexImg = `${path}uv-index.png`;
  const precipitationImg = `${path}precipitation.png`;
  const visibilityImg = `${path}visibility.png`;
  const tempratureImg = `${path}temprature.png`;

  // eslint-disable-next-line
  useEffect(() => {
    //getWeatherData(inputValue);
  }, []);

  async function getWeatherData(input) {
    let weather_api_key = process.env.REACT_APP_WEATHER_API;
    let url = `https://api.weatherbit.io/v2.0/current?city=${input}&key=${weather_api_key}&include=hourly&units=I`;

    

    let res = await fetch(url)
      .then((response) => {
        console.log("The response is :"+response.status);
        if (response.status !== 200) {
          alert("Unable to get Weather Data" + response.status);
        } else {
          setIsResponse(true);
          return response;
        }
      })
      .catch((error) => {
        setIsResponse(false);
        alert(error.toString());
      });

      let weatherData= await res.json();

    if (isResponse) {
      const wIcon = `${path}weather-icons/${weatherData.data[0].weather.icon}.png`;
      document.getElementById("icon").src = wIcon;

      setTemprature(Math.floor(weatherData.data[0].temp));
      setHumidity(Math.floor(weatherData.data[0].rh));
      setWindSpeed(Math.floor(weatherData.data[0].wind_spd));
      setFeelsLike(Math.floor(weatherData.data[0].app_temp));
      setUvIndex(Math.floor(weatherData.data[0].uv));
      setWeatherDesc(weatherData.data[0].weather.description);
      setVisibility(weatherData.data[0].vis);
    }
  }

  function search() {
    const cityName = document.getElementsByClassName("search-city");
    setInputValue(cityName[0].value);
    //getWeatherData(cityName[0].value);
  }

  return (
    <div className="weather-bar-container">
      <div className="container weather-bar-div">
        <div>
          <img className="logo-icon" src={"moodify.png"} alt="logo" />
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
