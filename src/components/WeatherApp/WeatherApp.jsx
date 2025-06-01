import axios from "axios";
import React, { useState } from "react";
import "./WeatherApp.css";

const API_KEY = import.meta.env.VITE_API_KEY; //Api key is secretive
// console.log("API key is:", API_KEY);   //just to test
// console.log(import.meta.env);    //just to test

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState();

  const getWeather = () => {
    if (!city) return; //if city is empty then do nothing

    setError(null);
    setWeather(null);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      })
      .catch(() => {
        setError("City not found or something went wrong");
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="container">
          <h2>Weather App</h2>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your City"
          />
          <button onClick={getWeather}>get weather</button>
        </div>
        <div className="info">
          {error && <p className="error">{error}</p>}
          {weather && (
            <div className="weather-info">
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="description">
                {weather.weather[0].description}
              </div>
              <div className="details">
                <span>Humidity: {weather.main.humidity}%</span>
                <span>Wind: {weather.wind.speed} m/s</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default WeatherApp;
