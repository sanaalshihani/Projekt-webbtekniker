import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ weatherData, isCelsius, onAddFavorite }) => {
  const [displayedTemperature, setDisplayedTemperature] = useState(null);

  useEffect(() => {
    // Konvertera temperaturen till rätt enhet när isCelsius ändras
    if (weatherData) {
      const temperature = isCelsius ? weatherData.temperature : celsiusToFahrenheit(weatherData.temperature);
      setDisplayedTemperature(temperature);
    }
  }, [weatherData, isCelsius]);

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  if (!weatherData) return <p>No data available</p>;

  return (
    <div className="main">
      <h2>{weatherData.city}</h2>
      <p>Average temperature: {displayedTemperature} {isCelsius ? '°C' : '°F'}</p>
      <button onClick={() => onAddFavorite(weatherData.city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
