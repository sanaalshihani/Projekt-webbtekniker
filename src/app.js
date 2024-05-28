import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar';
import WeatherDisplay from './components/weatherdisplay';
import SavedSearches from './components/savedsearches';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true); // Nytt state för temperaturenhet

  // Funktion för att hämta koordinater för en given stad
  const getCityCoordinates = async (city) => {
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: {
          name: city,
        },
      });
      return response.data.results[0];
    } catch (error) {
      console.error(error);
    }
  };

  // Funktion för att hämta väderdata för en given stad
  const getWeather = async (city) => {
    try {
      const cityData = await getCityCoordinates(city);
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: cityData.latitude,
          longitude: cityData.longitude,
          hourly: 'temperature_2m',
        },
      });

      // Konvertera temperaturen från Celsius till Fahrenheit om det behövs
      const temperature = isCelsius ? response.data.hourly.temperature_2m[0] : celsiusToFahrenheit(response.data.hourly.temperature_2m[0]);

      setWeatherData({
        city: cityData.name,
        temperature: temperature,
      });
      
      if (!savedSearches.includes(city)) {
        setSavedSearches([...savedSearches, city]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Funktion för att växla mellan Celsius och Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Funktion för att konvertera Celsius till Fahrenheit och vice versa
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <div>
      <h1>Find the average temperature in a city, town or place</h1>
      <button onClick={toggleTemperatureUnit}>{isCelsius ? 'Visa i Fahrenheit' : 'Visa i Celsius'}</button> {/* Knapp för att byta temperaturenhet */}
      <SearchBar onSearch={getWeather} />
      <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} />
      <SavedSearches savedSearches={savedSearches} onSelect={getWeather} />
    </div>
  );
};

export default App;
