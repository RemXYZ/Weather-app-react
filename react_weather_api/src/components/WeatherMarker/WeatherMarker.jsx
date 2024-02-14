import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import {
  WeatherPopup,
  PopupHeading,
  PopupImage,
  PopupParagraph
} from './WeatherMarker.style';
import './WeatherMarker.css';





// Function to classify the weather
const classifyWeather = (weather) => {
  if (weather.condition === undefined) {
    console.log("Nie moge wczytac dane z API, byc moze jest blad z API kluczem");
    return 'not nice';
  }
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
        <WeatherPopup>
          <PopupHeading>{`${weather.cityName} - ${weatherClassification.toUpperCase()}`}</PopupHeading>
          <PopupParagraph>{weather.condition} {weatherEmoji}</PopupParagraph>
          <PopupParagraph>Temperature: {weather.temperature} °C</PopupParagraph>
          <PopupParagraph>Condition: {weather.condition}</PopupParagraph>
          <PopupParagraph>Pressure: {weather.pressure}</PopupParagraph>
        </WeatherPopup>
      </Popup>
    </Marker>
  );
};

export default WeatherMarker;
