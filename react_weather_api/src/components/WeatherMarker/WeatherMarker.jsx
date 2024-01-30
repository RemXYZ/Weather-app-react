import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import './WeatherMarker.css';




// Function to classify the weather
const classifyWeather = (weather) => {
  const isRainFree = weather.condition.toLowerCase().indexOf('rain') === -1;
  const isNiceTemperature = weather.temperature >= 18 && weather.temperature <= 25;

  if (isRainFree && isNiceTemperature) {
    return 'nice';
  } else if (isRainFree || isNiceTemperature) {
    return 'passable';
  } else {
    return 'not nice';
  }
};
const WeatherMarker = ({ weather, position }) => {
  const weatherClassification = classifyWeather(weather);
  let weatherEmoji = '';

  switch (weatherClassification) {
    case 'nice':
      weatherEmoji = '😄';
      break;
    case 'passable':
      weatherEmoji = '😐';
      break;
    case 'not nice':
      weatherEmoji = '🙁';
      break;
    default:
      weatherEmoji = '';
  }

  const iconHtml = `
    <div class="marker-icon-wrapper">
      <img src="${weather.icon}" class="weather-icon" alt="weather icon" />
      <span class="weather-emoji">${weatherEmoji}</span>
    </div>
  `;

  const customIcon = L.divIcon({
    html: iconHtml,
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [25, 50], // Anchor point of the icon
    popupAnchor: [0, -50], // Point from which the popup should open relative to the iconAnchor
    className: 'weather-marker' // Custom class for CSS styling
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="weather-popup">
          <h3>{`${weather.cityName} - ${weatherClassification.toUpperCase()}`}</h3>
          <p>{weather.condition} {weatherEmoji}</p>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Condition: {weather.condition}</p>
          <p>Pressure: {weather.pressure}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default WeatherMarker;
