import React, { useState, useEffect } from "react";
import "./WeatherBar.css";
import Search from "./Search";

function WeatherBar() {
  const [cityName, setCityName] = useState("Sugar Land");
  const [temprature, setTemprature] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [uvIndex, setUvIndex] = useState();
  const [visiblity, setVisibility] = useState();
  const [isResponse, setIsResponse] = useState(true);

  const path = "images/WeatherBarAssets/";
  const humidityImg = `${path}humidity.png`;
  const windyImg = `${path}windy.png`;
  const uvIndexImg = `${path}uv-index.png`;
  const precipitationImg = `${path}precipitation.png`;
  const visibilityImg = `${path}visibility.png`;
  const tempratureImg = `${path}temprature.png`;

  let latitude = 29.619678;
  let longitude = -95.634949;

  useEffect(() => {
    //eslint-disable-next-line
    getWeatherData(latitude, longitude);
  }, []);

  async function getWeatherData(latitude, longitude) {
    let weather_api_key = process.env.REACT_APP_WEATHER_API;
    let url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${weather_api_key}&include=hourly&units=I`;

    let res = await fetch(url)
      .then((response) => {
        console.log("The response is :" + response.status);
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

    let weatherData = await res.json();

    if (isResponse) {
      const wIcon = `${path}weather-icons/${weatherData.data[0].weather.icon}.png`;
      document.getElementById("icon").src = wIcon;

      setCityName(weatherData.data[0].city_name);

      setTemprature(Math.floor(weatherData.data[0].temp));
      setHumidity(Math.floor(weatherData.data[0].rh));
      setWindSpeed(Math.floor(weatherData.data[0].wind_spd));
      setFeelsLike(Math.floor(weatherData.data[0].app_temp));
      setUvIndex(Math.floor(weatherData.data[0].uv));
      setWeatherDesc(weatherData.data[0].weather.description);
      setVisibility(weatherData.data[0].vis);
    }
  }

  const handleOnSearchCityChange = (searchCity) => {
    console.log(searchCity.value);
    const lat_log = searchCity.value.split(" ");
    console.log(lat_log[0]);
    console.log(lat_log[1]);
    getWeatherData(lat_log[0], lat_log[1]);
  };

  return (
    <div className="weather-bar-container">
      <div className="container weather-bar-div">
        <div className="moodify-logo">
          <img className="logo-icon" src={"moodify.png"} alt="logo" />
        </div>
        <Search onSearchCityChange={handleOnSearchCityChange} />
      </div>
      <div className="weather-div">
        <div className="temprature-div">
          <img className="weather-icon" id="icon" alt="" />
          <div className="weather-desc">
            <div className="desc heading txt">{weatherDesc}</div>
          </div>
          <div className="city-temp-div">
            <div className="city-temp heading">{temprature}&#176;F</div>
            <div className="city-name heading">{cityName}</div>
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
            <div className="heading txt">Humidity</div>
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
            <div className="heading txt">Wind speed</div>
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
            <div className="heading txt">UV INDEX</div>
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
            <div className="heading txt">Precipitation</div>
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
            <div className="heading txt">Visibility</div>
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
            <div className="heading txt">Feels like</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherBar;
