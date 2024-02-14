// src/redux/slices/weatherSlice.js
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';

// Assuming you have a function to fetch weather data
import { fetchWeatherForCity } from '../../api/weatherApi';





const initialState = {
  weatherData: [],
  error: null,
  loading: false,
  loading_box: false,
};
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading_box = true;
    },
    fetchWeatherEnd: (state) => {
      state.loading_box = false;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setWeather: (state, action) => {
      state.weatherData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Definiowanie akcji jako część slice'a

  },
  
  
});



export const fetchWeatherForNewCities = createAction('FETCH_WEATHER_FOR_NEW_CITIES');

// Actions
export const { fetchWeatherStart, fetchWeatherEnd, setWeather, setWeatherData, setError } = weatherSlice.actions;

// Reducer
export default weatherSlice.reducer;
