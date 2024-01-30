export const FETCH_CITIES = 'FETCH_CITIES';
export const SET_CITIES = 'SET_CITIES';
export const SET_CITIES_ERROR = 'SET_CITIES_ERROR';

export const fetchCities = (southWest, northEast) => ({
  type: FETCH_CITIES,
  payload: { southWest, northEast },
});

export const setCities = cities => ({
  type: SET_CITIES,
  payload: cities,
});

export const setError = error => ({
  type: SET_CITIES_ERROR,
  payload: error,
});