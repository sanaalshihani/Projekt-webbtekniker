import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return <p>No data available</p>;

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherDisplay;
