import React, { useState } from 'react';

const ClothingRecommendation = () => {
  const [temperature, setTemperature] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const clothingRecommendation = (temp) => {
    if (temp < 0) {
      return "Freezing weather - dress accordingly: Wear warm clothes, preferably a thick sweater, and don't forget outerwear!";
    } else if (temp >= 0 && temp < 15) {
      return "Mild weather - choose your clothes wisely and enjoy the pleasant atmosphere: Dress in lighter clothes, like a thinner sweater, and consider adding outerwear!";
    } else if (temp >= 15 && temp <= 30) {
      return "Warm weather - adjust your clothes to the heat: Wear light and airy clothes, and make sure to protect yourself from the sun with appropriate sunscreen!";
    } else {
      return "Temperature outside expected range. Use common sense when dressing.";
    }
  };

  const handleGenerateRecommendation = () => {
    const temp = parseFloat(temperature);
    if (!isNaN(temp)) {
      const recommendation = clothingRecommendation(temp);
      setRecommendation(recommendation);
    } else {
      setRecommendation("Invalid input. Please enter a valid temperature in Celsius.");
    }
  };

  return (
    <div className="clothing-recommendation">
      <h2>Clothing Recommendation</h2>
      <label htmlFor="temperatureInput">Enter the current weather temperature in Celsius:</label>
      <input
        type="number"
        id="temperatureInput"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
        placeholder="Enter temperature..."
        step="any"
        required
      />
      <button onClick={handleGenerateRecommendation}>Generate Recommendation</button>
      {recommendation && <p>{recommendation}</p>}
    </div>
  );
};

export default ClothingRecommendation;
