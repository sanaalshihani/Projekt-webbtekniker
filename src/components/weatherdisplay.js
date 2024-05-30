import React from 'react';

const WeatherDisplay = ({ weatherData, isCelsius, onAddFavorite }) => {
  if (!weatherData) return <p>No data available</p>;

  return (
    <div class ="main">
      <h2>{weatherData.city}</h2>
      <p>Average temperature: {weatherData.temperature} {isCelsius ? '°C' : '°F'}</p>
      <button onClick={() => onAddFavorite(weatherData.city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
