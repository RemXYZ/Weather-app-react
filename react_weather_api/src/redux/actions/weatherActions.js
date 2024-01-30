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

  export const SET_ERROR = 'SET_ERROR';
export const SET_WEATHER = 'SET_WEATHER';
export const SET_WEATHER_ERROR = 'SET_WEATHER_ERROR';

export const fetchWeather = (lat, lon) => ({
  type: FETCH_WEATHER,
  payload: { lat, lon },
});

export const setWeather = weather => ({
  type: SET_WEATHER,
  payload: weather,
});

export const setError = error => ({
  type: SET_WEATHER_ERROR,
  payload: error,
});


export const FETCH_WEATHER_START = 'FETCH_WEATHER_START';
export const FETCH_WEATHER_END = 'FETCH_WEATHER_END';

export const fetchWeatherStart = () => ({
  type: FETCH_WEATHER_START,
});

export const fetchWeatherEnd = () => ({
  type: FETCH_WEATHER_END,
});


export const FETCH_WEATHER_START_FOR_CITY = 'FETCH_WEATHER_START_FOR_CITY';
export const FETCH_WEATHER_END_FOR_CITY = 'FETCH_WEATHER_END_FOR_CITY';

export const fetchWeatherStartForCity = (cityId) => ({
  type: 'FETCH_WEATHER_START_FOR_CITY',
  payload: cityId,
});

export const fetchWeatherEndForCity = (cityId) => ({
  type: 'FETCH_WEATHER_END_FOR_CITY',
  payload: cityId,
});

