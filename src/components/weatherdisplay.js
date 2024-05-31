import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ weatherData, isCelsius, onAddFavorite }) => {
  const [displayedTemperature, setDisplayedTemperature] = useState(null);

  useEffect(() => {
    if (weatherData) {
      const temperature = isCelsius ? weatherData.temperature : celsiusToFahrenheit(weatherData.temperature);
      setDisplayedTemperature(temperature);
    }
  }, [weatherData, isCelsius]);

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 0:
        return '☀️'; // Clear sky
      case 1:
      case 2:
      case 3:
        return '🌤️'; // Partly cloudy
      case 45:
      case 48:
        return '🌫️'; // Fog
      case 51:
      case 53:
      case 55:
        return '🌧️'; // Drizzle
      case 61:
      case 63:
      case 65:
        return '🌧️'; // Rain
      case 71:
      case 73:
      case 75:
        return '❄️'; // Snow
      case 95:
        return '⛈️'; // Thunderstorm
      default:
        return '🌡️'; // Default weather icon
    }
  };

  if (!weatherData) return <p>No data available</p>;

  return (
    <div className="main">
      <h2>{weatherData.city}</h2>
      <p>Average temperature: {displayedTemperature} {isCelsius ? '°C' : '°F'}</p>
      <div className="weather-icon">{getWeatherIcon(weatherData.condition)}</div>
      <button onClick={() => onAddFavorite(weatherData.city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
