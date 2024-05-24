import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './src/components/searchbar';
import WeatherDisplay from './src/components/weatherdisplay';
import SavedSearches from './src/components/savedsearches';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);

  const API_KEY = 'YOUR_API_KEY';
  const BASE_URL = 'http://api.openweathermap.org/data/2.5';

  const getWeather = async (city) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
      if (!savedSearches.includes(city)) {
        setSavedSearches([...savedSearches, city]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={getWeather} />
      <WeatherDisplay weatherData={weatherData} />
      <SavedSearches savedSearches={savedSearches} onSelect={getWeather} />
    </div>
  );
};

export default App;
