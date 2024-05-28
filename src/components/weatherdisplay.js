import React from 'react';

const WeatherDisplay = ({ weatherData, isCelsius }) => {
  if (!weatherData) return <p>No data available</p>;

  return (
    <div>
      <h2>{weatherData.city}</h2>
      <p>Average temperature: {weatherData.temperature} {isCelsius ? '°C' : '°F'}</p> {/* Inkludera enheten baserat på den valda enheten */}
    </div>
  );
};

export default WeatherDisplay;
