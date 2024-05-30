import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/searchbar';
import WeatherDisplay from './components/weatherdisplay';
import SavedSearches from './components/savedsearches';
import './index.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);
  const [favorites, setFavorites] = useState([]); // Se till att favorites är definierat här
  const [isCelsius, setIsCelsius] = useState(true);

  const getCityCoordinates = async (city) => {
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: { name: city },
      });
      return response.data.results[0];
    } catch (error) {
      console.error(error);
    }
  };

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

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };

  const removeSavedSearch = (city) => {
    setSavedSearches(savedSearches.filter(search => search !== city));
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter(fav => fav !== city));
  };


  return (
    <div>
      <h1>Find the average temperature in a city, town or place</h1>
      <button onClick={toggleTemperatureUnit}>{isCelsius ? 'Visa i Fahrenheit' : 'Visa i Celsius'}</button>
      <SearchBar onSearch={getWeather} />
      <WeatherDisplay weatherData={weatherData} isCelsius={isCelsius} onAddFavorite={addFavorite} />
      <SavedSearches savedSearches={savedSearches} onSelect={getWeather} onRemove={removeSavedSearch} />
      <div class="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>
              <img src="./images/star.png" height="20px" alt="Star Icon" className="star-icon" /> {city}
              <button onClick={() => removeFavorite(city)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
