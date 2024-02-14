import { createSelector } from 'reselect';

// Proste selektory, które pobierają części stanu
export const weatherDataSelector = state => state.weather.weatherData;
export const mapBoundsSelector = state => state.mapBounds;

// Złożony selektor, który korzysta z prostych selektorów
export const sortedWeatherDataSelector = createSelector(
  [weatherDataSelector, mapBoundsSelector],
  (weatherData, mapBounds) => {
    return weatherData
      .filter(city => city && city.lat >= mapBounds.southWest.lat && city.lat <= mapBounds.northEast.lat
          && city.lon >= mapBounds.southWest.lng && city.lon <= mapBounds.northEast.lng)
      .sort((a, b) => b.population - a.population)
      .slice(0, 20);
  }
);
