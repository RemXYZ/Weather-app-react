// src/redux/actions/weatherActions.js
export const FETCH_WEATHER = 'FETCH_WEATHER';
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';

// export const fetchWeather = (lat, lon) => ({ type: FETCH_WEATHER, payload: { lat, lon } });
export const setWeatherData = data => ({
    type: SET_WEATHER_DATA,
    payload: data,
  });
  export const fetchWeatherForNewCities = bounds => ({
    type: 'FETCH_WEATHER_FOR_NEW_CITIES',
    payload: bounds,
  });

