// src/redux/slices/weatherSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Assuming you have a function to fetch weather data
import { fetchWeatherForCity } from '../../api/weatherApi';

// export const fetchWeatherForNewCities = createAsyncThunk(
//   'weather/fetchWeatherForNewCities',
//   async ({ southWest, northEast }, { rejectWithValue }) => {
//     try {
//       const weatherData = await fetchWeatherForCity(southWest, northEast);
//       return weatherData;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );




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
  },
  
});

// Actions
export const { fetchWeatherStart, fetchWeatherEnd, setWeather, setWeatherData, setError, fetchWeatherForNewCities } = weatherSlice.actions;

// Reducer
export default weatherSlice.reducer;
